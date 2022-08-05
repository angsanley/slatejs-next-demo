// Import React dependencies.
import React, { useState, useCallback } from 'react'
// Import the Slate editor factory.
import { Editor, createEditor, Transforms } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import { MarkButton } from './MarkButton'
import { Button } from './Button'
import { Card } from './Card'

const CodeElement = (props) => {
    return (
        <pre {...props.attributes}>
            <code className="font-italic">{props.children}</code>
        </pre>
    )
}

const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>
}

const CUSTOM_COMPONENTS_TYPES = {
    DEFAULT: 'paragrah',
    CODE: 'code',
    BUTTON: 'button',
    CARD: 'textfield',
}

const CUSTOM_COMPONENTS = {
    [CUSTOM_COMPONENTS_TYPES.DEFAULT]: DefaultElement,
    [CUSTOM_COMPONENTS_TYPES.CODE]: CodeElement,
    [CUSTOM_COMPONENTS_TYPES.BUTTON]: Button,
    [CUSTOM_COMPONENTS_TYPES.CARD]: Card,
}

export const TheEditor = () => {
    const initialValue = [
        {
            type: CUSTOM_COMPONENTS_TYPES.DEFAULT,
            children: [{ text: 'A line of text in a paragraph.' }],
        },
    ]

    const Leaf = ({ attributes, children, leaf }) => {
        if (leaf.bold) {
            children = <strong>{children}</strong>
        }

        return <span {...attributes}>{children}</span>
    }

    const [boldActive, setBoldActive] = useState(false)

    const [editor] = useState(() => withReact(createEditor()))
    const renderLeaf = useCallback((props) => <Leaf {...props} />, [])

    const toggleBold = (editor) => {
        if (boldActive) {
            Editor.removeMark(editor, 'bold')
        } else {
            Editor.addMark(editor, 'bold', true)
        }

        setBoldActive((oldVal) => !oldVal)
    }

    const handleStyleCustom = (target) => () => {
        const [match] = Editor.nodes(editor, {
            match: (n) => n.type === target,
        })
        Transforms.setNodes(
            editor,
            { type: match ? CUSTOM_COMPONENTS_TYPES.DEFAULT : target },
            { match: (n) => Editor.isBlock(editor, n) }
        )
    }

    const renderElement = (props) => {
        const Component = CUSTOM_COMPONENTS[props.element.type]
        return Component && <Component {...props} />
    }

    return (
        <div className="bg-white shadow-lg rounded-lg w-full h-full">
            <div className="flex w-full bg-gray-100 p-4 rounded-t-lg">
                <MarkButton
                    onClick={() => toggleBold(editor)}
                    isActive={boldActive}
                >
                    B
                </MarkButton>
                <MarkButton
                    onClick={handleStyleCustom(CUSTOM_COMPONENTS_TYPES.CODE)}
                >
                    <>&lt;/&gt;</>
                </MarkButton>
                <MarkButton
                    onClick={handleStyleCustom(CUSTOM_COMPONENTS_TYPES.BUTTON)}
                >
                    Button
                </MarkButton>
                <MarkButton
                    onClick={handleStyleCustom(CUSTOM_COMPONENTS_TYPES.CARD)}
                >
                    Card
                </MarkButton>
            </div>
            <Slate editor={editor} value={initialValue}>
                <div className="p-4">
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                    />
                </div>
            </Slate>
        </div>
    )
}
