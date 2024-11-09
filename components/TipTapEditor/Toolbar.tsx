"use client"
import { useEffect, useCallback, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, SubscriptIcon, SuperscriptIcon, CodeIcon, Pilcrow, Highlighter, AlignLeft, AlignRight, AlignCenter, AlignJustify, SquareMinus, Undo2, Redo2, ListOrdered, List } from "lucide-react";
import { useEditorContext } from "./EditorContext";
import { ToolTip } from "../core";



export const Toolbar = () => {
  const { currentEditor } = useEditorContext();

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    subscript: false,
    superscript: false,
    code: false,
    paragraph: false,
    highlight: false,
    left: false,
    center: false,
    right: false,
    justify: false,
    horizontal: false,
    undo: false,
    redo: false,
    bullet: false,
    ordered: false,
  });

  const checkActiveFormats = useCallback(() => {
    if (!currentEditor) return;

    const alignment = currentEditor.getAttributes('paragraph').textAlign;

    setActiveFormats({
      bold: currentEditor.isActive("bold"),
      italic: currentEditor.isActive("italic"),
      underline: currentEditor.isActive("underline"),
      strike: currentEditor.isActive("strike"),
      subscript: currentEditor.isActive("subscript"),
      superscript: currentEditor.isActive("superscript"),
      code: currentEditor.isActive("code"),
      paragraph: currentEditor.isActive("paragraph"),
      highlight: currentEditor.isActive("highlight"),
      left: alignment === 'left',
      center: alignment === 'center',
      right: alignment === 'right',
      justify: alignment === 'justify',
      horizontal: currentEditor.isActive("horizontal"),
      undo: currentEditor.isActive("undo"),
      redo: currentEditor.isActive("redo"),
      bullet: currentEditor.isActive("bullet"),
      ordered: currentEditor.isActive("ordered"),
    });
  }, [currentEditor]);

  useEffect(() => {
    if (currentEditor) {
      const handleSelectionUpdate = () => {
        checkActiveFormats();
      };

      currentEditor.on('selectionUpdate', handleSelectionUpdate);
      checkActiveFormats();

      return () => {
        currentEditor.off('selectionUpdate', handleSelectionUpdate);
      };
    }
  }, [currentEditor, checkActiveFormats]);

  const handleBold = useCallback(() => {
    currentEditor?.chain().focus().toggleBold().run();
  }, [currentEditor]);

  const handleItalic = useCallback(() => {
    currentEditor?.chain().focus().toggleItalic().run();
  }, [currentEditor]);

  const handleUnderline = useCallback(() => {
    currentEditor?.chain().focus().toggleUnderline().run();
  }, [currentEditor]);

  const handleStrike = useCallback(() => {
    currentEditor?.chain().focus().toggleStrike().run();
  }, [currentEditor]);

  const handleSubscript = useCallback(() => {
    currentEditor?.chain().focus().toggleSubscript().run();
  }, [currentEditor]);

  const handleSuperscript = useCallback(() => {
    currentEditor?.chain().focus().toggleSuperscript().run();
  }, [currentEditor]);

  const handleCode = useCallback(() => {
    currentEditor?.chain().focus().toggleCode().run();
  }, [currentEditor]);

  const handleParagraph = useCallback(() => {
    currentEditor?.chain().focus().setParagraph().run();
  }, [currentEditor]);

  const handlehighlighter = useCallback(() => {
    currentEditor?.chain().focus().toggleHighlight().run();
  }, [currentEditor]);

  const handleLeftAlign = useCallback(() => {
    currentEditor?.chain().focus().setTextAlign('left').run();
  }, [currentEditor]);

  const handleCenterAlign = useCallback(() => {
    currentEditor?.chain().focus().setTextAlign('center').run();
  }, [currentEditor]);

  const handleRightAlign = useCallback(() => {
    currentEditor?.chain().focus().setTextAlign('right').run();
  }, [currentEditor]);

  const handleJustifyAlign = useCallback(() => {
    currentEditor?.chain().focus().setTextAlign('justify').run();
  }, [currentEditor]);

  const handleHorizontalRue = useCallback(() => {
    currentEditor?.chain().focus().setHorizontalRule().run();
  }, [currentEditor]);

  const handleundo = useCallback(() => {
    currentEditor?.chain().focus().undo().run();
  }, [currentEditor]);

  const handleredo = useCallback(() => {
    currentEditor?.chain().focus().redo().run();
  }, [currentEditor]);

  const handleBullet = useCallback(() => {
    currentEditor?.chain().focus().toggleBulletList().run();
  }, [currentEditor]);

  const handleOrdered = useCallback(() => {
    currentEditor?.chain().focus().toggleOrderedList().run();
  }, [currentEditor]);

  return (
    <div className="containers">
    <div className="rounded-full toolbar flex justify-start gap-3 shrink-0 overflow-x-auto  px-2 bg-[#EDF2FA]">
      <ToolTip title="Bold"><Toggle onClick={handleBold} pressed={activeFormats.bold}>
        <BoldIcon className="h-4 w-4" />
      </Toggle></ToolTip>

      <ToolTip title="Italic"><Toggle onClick={handleItalic} pressed={activeFormats.italic}>
        <ItalicIcon className="h-4 w-4" />
      </Toggle></ToolTip>

      <ToolTip title="Strike"><Toggle onClick={handleStrike} pressed={activeFormats.strike}>
        <StrikethroughIcon className="h-4 w-4" />
      </Toggle></ToolTip>

      <ToolTip title="Underline"><Toggle onClick={handleUnderline} pressed={activeFormats.underline}>
        <UnderlineIcon className="h-4 w-4" />
      </Toggle></ToolTip>

      <ToolTip title="Subscript"><Toggle onClick={handleSubscript} pressed={activeFormats.subscript}>
        <SubscriptIcon className="h-4 w-4" />
      </Toggle></ToolTip>

      <ToolTip title="Superscript"><Toggle onClick={handleSuperscript} pressed={activeFormats.superscript}>
        <SuperscriptIcon className="h-4 w-4" />
      </Toggle></ToolTip>

      <ToolTip title="Code"><Toggle onClick={handleCode} pressed={activeFormats.code}>
        <CodeIcon className="h-4 w-4" />
      </Toggle></ToolTip>

      <ToolTip title="Paragraph"><Toggle onClick={handleParagraph} pressed={activeFormats.paragraph}>
        <Pilcrow className="h-4 w-4" />
      </Toggle></ToolTip>

      <ToolTip title="Highlight"><Toggle onClick={handlehighlighter} pressed={activeFormats.highlight}>
        <Highlighter className="h-4 w-4" />
      </Toggle></ToolTip>

      <div className="textAlign">
        <ToolTip title="Left"><Toggle onClick={handleLeftAlign} pressed={activeFormats.left}>
          <AlignLeft className="h-4 w-4" />
        </Toggle></ToolTip>

        <ToolTip title="Center"><Toggle onClick={handleCenterAlign} pressed={activeFormats.center} >
          <AlignCenter className="h-4 w-4" />
        </Toggle></ToolTip>

        <ToolTip title="Right"><Toggle onClick={handleRightAlign} pressed={activeFormats.right} >
          <AlignRight className="h-4 w-4" />
        </Toggle></ToolTip>

        <ToolTip title="Justify"><Toggle onClick={handleJustifyAlign} pressed={activeFormats.justify} >
          <AlignJustify className="h-4 w-4" />
        </Toggle></ToolTip>
      </div>

      <ToolTip title="Horizontal rule"><Toggle onClick={handleHorizontalRue} pressed={activeFormats.horizontal}>
        <SquareMinus className="h-4 w-4" />
      </Toggle></ToolTip>

      <div>
        <ToolTip title="Undo"><Toggle onClick={handleundo} pressed={activeFormats.horizontal}>
          <Undo2 className="h-4 w-4" />
        </Toggle></ToolTip>

        <ToolTip title="Redo"><Toggle onClick={handleredo} pressed={activeFormats.horizontal}>
          <Redo2 className="h-4 w-4" />
        </Toggle></ToolTip>
      </div>

      <div>
        <ToolTip title="Bullet list"><Toggle onClick={handleBullet} pressed={activeFormats.bullet}>
          <List className="h-4 w-4" />
        </Toggle></ToolTip>

        <ToolTip title="Ordered list"><Toggle onClick={handleOrdered} pressed={activeFormats.ordered}>
          <ListOrdered className="h-4 w-4" />
        </Toggle></ToolTip>
      </div>
    </div>
    </div>
  );
};

