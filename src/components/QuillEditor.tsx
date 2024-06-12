"use client";
import React, { useEffect, useRef } from "react";
import ReactQuill, { QuillOptions, Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
  tabs?: string;
  query?: string;
  response?: string;
  outlineResponse?: string;
  assignment?: string;
  editorConfig?: QuillOptions;
  quiz?: string;
}

interface QuillEditorRef {
  getEditor: () => typeof Quill | null;
}
const QuillEditor = React.forwardRef<QuillEditorRef, Props>(
  (
    { tabs, query, response, outlineResponse, quiz, assignment, editorConfig },
    ref
  ) => {
    const defaultConfig = {
      modules: {
        toolbar: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "video"],
          ["clean"],
        ],
      },
      formats: [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "image",
        "video",
      ],
    };

    const quillRef = useRef<ReactQuill>(null);

    useEffect(() => {
      if (quillRef.current) {
        const quill = quillRef.current!.getEditor();
        let initialData = "";

        if (tabs === "") {
          initialData = `<p>${query === "" ? response || "" : query}</p>`;
        } else {
          initialData = `<p>${
            tabs === "outline"
              ? outlineResponse
              : tabs === "quiz"
              ? quiz
              : tabs === "assignment"
              ? assignment
              : ""
          }</p>`;
        }

        quill.clipboard.dangerouslyPasteHTML(initialData);
      }
    }, [quillRef, tabs, query, response, outlineResponse, quiz, assignment]);

    return (
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={editorConfig?.modules || defaultConfig.modules}
        formats={editorConfig?.formats || defaultConfig.formats}
        className="min-h-[500px]"
      />
    );
  }
);

export default QuillEditor;
