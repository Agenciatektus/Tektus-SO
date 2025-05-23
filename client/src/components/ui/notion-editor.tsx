import React, { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { cn } from '@/lib/utils';

interface NotionEditorProps {
  value: any[];
  onChange: (value: any[]) => void;
  placeholder?: string;
  autoSave?: boolean;
  autoSaveInterval?: number;
  readOnly?: boolean;
}

export function NotionEditor({
  value,
  onChange,
  placeholder = "Digite '/' para comandos...",
  autoSave = false,
  autoSaveInterval = 2000,
  readOnly = false,
}: NotionEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: value,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange(json);
    },
  });

  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (autoSave && editor) {
      autoSaveTimeoutRef.current = setInterval(() => {
        const json = editor.getJSON();
        onChange(json);
      }, autoSaveInterval);
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearInterval(autoSaveTimeoutRef.current);
      }
    };
  }, [editor, autoSave, autoSaveInterval, onChange]);

  return (
    <div className={cn(
      "min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
      "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
      readOnly && "opacity-50 cursor-not-allowed"
    )}>
      <EditorContent 
        editor={editor} 
        className="min-h-[150px] w-full bg-transparent outline-none prose prose-sm max-w-none border-0 shadow-none focus:outline-none focus:ring-0"
      />
    </div>
  );
} 