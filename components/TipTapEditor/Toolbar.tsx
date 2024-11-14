"use client"
import { useEffect, useCallback, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, SubscriptIcon, SuperscriptIcon, CodeIcon, Pilcrow, Highlighter, AlignLeft, AlignRight, AlignCenter, AlignJustify, SquareMinus, Undo2, Redo2, ListOrdered, List, Link2, Link2Off, Palette, MessageCircle } from "lucide-react";
import { useEditorContext } from "./EditorContext";
import { Portal, ToolTip } from "../core";
import { CommentStore } from "./CommentStore";

export const Toolbar = () => {
  const { currentEditor } = useEditorContext();
  const [color, setColor] = useState(false);
  const [comments, setComments] = useState<{
    [key: string]: { text: string; position: number };
  }>({});


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
    link: false,
    textStyle: false,
    comment: false,
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
      link: currentEditor.isActive("link"),
      textStyle: currentEditor.isActive("textStyle"),
      comment: currentEditor.isActive("comment"),
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

  const handleLink = useCallback(() => {
    const url = prompt("Enter the URL");
    if (url) {
      currentEditor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  }, [currentEditor]);

  const handleRemoveLink = useCallback(() => {
    currentEditor?.chain().focus().unsetLink().run()
  }, [currentEditor]);

  // const saveCommentToApi = async ({ commentId, commentData }: any) => {
  //   try {
  //     const response = await fetch("/api/comment", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ 
  //         'id': commentId,  // Send the comment ID with the appropriate key
  //         ...commentData 
  //       }),
  //     });
  //     console.log(response);
  //     if (!response.ok) {
  //       throw new Error("Failed to save comment");
  //     }
  //     console.log("Comment saved successfully");
  //   } catch (error) {
  //     console.error("Error saving comment:", error);
  //   }
  // };
  
  // const handleComment = () => {
  //   const commentContent = prompt('Enter your comment:');
    
  //   if (commentContent) {
  //     const commentId = new Date().getTime().toString();
  
  //     // Access the current selection position
  //     const selection = currentEditor?.state.selection;
  //     const position = selection ? selection.from : 0;
  
  //     if (selection) {
  //       currentEditor?.chain()
  //         .focus()
  //         .setMark('comment', {
  //           class: 'comment', 
  //           backgroundColor: 'gray', 
  //           'data-comment-id': commentId // Set the comment ID for this selection
  //         })
  //         .run();
  //     }
  
  //     // Save the comment in the state
  //     setComments(prevComments => ({
  //       ...prevComments,
  //       [commentId]: { text: commentContent, position },
  //     }));
  
  //     // Save the comment to an external API with the 'data-comment-id'
  //     saveCommentToApi({
  //       commentId,
  //       commentData: { text: commentContent, position },
  //     });
  //   }
  // };
  
  
  

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

        <div>
          <ToolTip title="Link"><Toggle onClick={handleLink} pressed={activeFormats.link}>
            <Link2 className="h-4 w-4" />
          </Toggle></ToolTip>

          <ToolTip title="Ordered list"><Toggle onClick={handleRemoveLink} pressed={activeFormats.link}>
            <Link2Off className="h-4 w-4" />
          </Toggle></ToolTip>
        </div>

        <div >
          <Toggle type="button" onClick={() => setColor(!color)}><Palette className="h-4 w-4" /></Toggle>

          {color ? (
            <div className="absolute bg-[#F9FBFD] p-2.5 rounded-[10px] ">
              <div >
                <Toggle className="p-0" onClick={() => currentEditor?.chain().focus().setColor('#958DF1').run()} pressed={activeFormats.textStyle}>
                  <div className="bg-[#958DF1] w-[15px] h-[15px]"></div>
                </Toggle>

                <Toggle className="p-0" onClick={() => currentEditor?.chain().focus().setColor('#F98181').run()} pressed={activeFormats.textStyle}>
                  <div className="bg-[#F98181] w-[15px] h-[15px]"></div>
                </Toggle>

                <Toggle className="p-0" onClick={() => currentEditor?.chain().focus().setColor('#FBBC88').run()} pressed={activeFormats.textStyle}>
                  <div className="bg-[#FBBC88] w-[15px] h-[15px]"></div>
                </Toggle>

                <Toggle className="p-0" onClick={() => currentEditor?.chain().focus().setColor('#FAF594').run()} pressed={activeFormats.textStyle}>
                  <div className="bg-[#FAF594] w-[15px] h-[15px]"></div>
                </Toggle>

                <Toggle className="p-0" onClick={() => currentEditor?.chain().focus().setColor('#70CFF8').run()} pressed={activeFormats.textStyle}>
                  <div className="bg-[#70CFF8] w-[15px] h-[15px]"></div>
                </Toggle>

                <Toggle className="p-0" onClick={() => currentEditor?.chain().focus().setColor('#94FADB').run()} pressed={activeFormats.textStyle}>
                  <div className="bg-[#94FADB] w-[15px] h-[15px]"></div>
                </Toggle>

                <Toggle className="p-0" onClick={() => currentEditor?.chain().focus().setColor('#B9F18D').run()} pressed={activeFormats.textStyle}>
                  <div className="bg-[#B9F18D] w-[15px] h-[15px]"></div>
                </Toggle>


              </div>
              <input
                type="color"
                onInput={event => currentEditor?.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
                value={currentEditor?.getAttributes('textStyle').color}
                data-testid="setColor"
              />
            </div>
          ) : null}
          {/* <ToolTip title="Add Comment">
            <Toggle onClick={handleComment} pressed={activeFormats.comment}>
              <MessageCircle className="h-4 w-4" />
            </Toggle>
          </ToolTip> */}
        </div>
      </div>
    </div>
  );
};