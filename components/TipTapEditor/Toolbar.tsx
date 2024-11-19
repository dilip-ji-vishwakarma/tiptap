"use client"
import React, { useEffect, useCallback, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, SubscriptIcon, SuperscriptIcon, CodeIcon, Pilcrow, Highlighter, AlignLeft, AlignRight, AlignCenter, AlignJustify, SquareMinus, Undo2, Redo2, ListOrdered, List, Link2, Link2Off, Palette, Image, Film, PaintBucket, CodeXml, MessageSquareQuote, Plus, Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Braces } from "lucide-react";
import { useEditorContext } from "./EditorContext";
import { ToolTip } from "../core";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export const Toolbar = () => {
  const { currentEditor } = useEditorContext();
  const [activeHighlightColor, setActiveHighlightColor] = useState<string | null>(null);
  const [height, setHeight] = useState(480)
  const [width, setWidth] = useState(640)
  const [videoUrl, setVideoUrl] = useState('');

  const [imageUrl, setImageUrl] = useState('')

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
    bullet: false,
    ordered: false,
    link: false,
    textStyle: false,
    blockquote: false,
    heading: false,
  });

  const checkActiveFormats = useCallback(() => {
    if (!currentEditor) return;

    const alignment = currentEditor.getAttributes('paragraph').textAlign;
    const highlight = currentEditor.getAttributes('highlight')?.color || null;

    setActiveFormats({
      bold: currentEditor.isActive("bold"),
      italic: currentEditor.isActive("italic"),
      underline: currentEditor.isActive("underline"),
      strike: currentEditor.isActive("strike"),
      subscript: currentEditor.isActive("subscript"),
      superscript: currentEditor.isActive("superscript"),
      code: currentEditor.isActive("code"),
      paragraph: currentEditor.isActive("paragraph"),
      highlight: !!highlight,
      left: alignment === 'left',
      center: alignment === 'center',
      right: alignment === 'right',
      justify: alignment === 'justify',
      horizontal: currentEditor.isActive("horizontal"),
      bullet: currentEditor.isActive("bullet"),
      ordered: currentEditor.isActive("ordered"),
      link: currentEditor.isActive("link"),
      textStyle: currentEditor.isActive("textStyle"),
      blockquote: currentEditor.isActive("blockquote"),
      heading: currentEditor.isActive("heading"),
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

  const handleUnsetCode = useCallback(() => {
    currentEditor?.chain().focus().unsetCode().run()
  }, [currentEditor]);

  const handleBlockquote = useCallback(() => {
    currentEditor?.chain().focus().toggleBlockquote().run()
  }, [currentEditor]);

  const handleHighlight = useCallback((color: string) => {
    currentEditor?.chain().focus().toggleHighlight({ color }).run();
    setActiveHighlightColor(color); // Set the active color
  }, [currentEditor]);

  const addImage = () => {
    if (imageUrl) {
      currentEditor?.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl('')
    }
  }



  const insertYouTubeVideo = () => {
    if (!videoUrl) return;

    const embedUrl = videoUrl.replace('watch?v=', 'embed/');
    const videoWidth = Math.max(320, parseInt(width.toString(), 10)) || 640;
    const videoHeight = Math.max(180, parseInt(height.toString(), 10)) || 480;

    currentEditor?.commands.setYoutubeVideo({
      src: embedUrl,
      width: videoWidth as number,
      height: videoHeight as number,
    });
    setVideoUrl('');
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && currentEditor) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result
        if (typeof result === 'string') {
          currentEditor?.chain().focus().setImage({ src: result }).run()
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const insertComponent = (type: string) => {
    currentEditor
      ?.chain()
      .focus()
      .insertContent(`<react-component></react-component>`)
      .run();
  };

  const MonacoComponent = (type: string) => {
    currentEditor
      ?.chain()
      .focus()
      .insertContent(`<monaco-component></monaco-component>`)
      .run();
  };

  const inputClass = "w-full border-[#c7c7c7] border p-2 placeholder:text-sm rounded-md";

  return (
    <div className="w-full">
      <div className="md:rounded-full toolbar flex flex-wrap justify-start md:gap-3 gap-4 md:shrink-0 overflow-x-auto  px-2 py-1.5 bg-[#EDF2FA]">
        <ToolTip title="Undo"><Toggle onClick={handleundo} disabled={!currentEditor?.can().undo()}>
          <Undo2 className="h-4 w-4" />
        </Toggle></ToolTip>

        <ToolTip title="Redo"><Toggle onClick={handleredo} disabled={!currentEditor?.can().redo()}>
          <Redo2 className="h-4 w-4" />
        </Toggle></ToolTip>

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

        <ToolTip title="Unset Code"><Toggle onClick={handleUnsetCode} pressed={activeFormats.code}>
          <CodeXml className="h-4 w-4" />
        </Toggle></ToolTip>

        <ToolTip title="Paragraph"><Toggle onClick={handleParagraph} pressed={activeFormats.paragraph}>
          <Pilcrow className="h-4 w-4" />
        </Toggle></ToolTip>

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

        <ToolTip title="Horizontal rule"><Toggle onClick={handleHorizontalRue} pressed={activeFormats.horizontal}>
          <SquareMinus className="h-4 w-4" />
        </Toggle></ToolTip>

        <ToolTip title="Blockquote"><Toggle onClick={handleBlockquote} pressed={activeFormats.blockquote}>
          <MessageSquareQuote className="h-4 w-4" />
        </Toggle></ToolTip>

        <ToolTip title="Bullet list"><Toggle onClick={handleBullet} pressed={activeFormats.bullet}>
          <List className="h-4 w-4" />
        </Toggle></ToolTip>

        <ToolTip title="Ordered list"><Toggle onClick={handleOrdered} pressed={activeFormats.ordered}>
          <ListOrdered className="h-4 w-4" />
        </Toggle></ToolTip>

        <ToolTip title="Link"><Toggle onClick={handleLink} pressed={activeFormats.link}>
          <Link2 className="h-4 w-4" />
        </Toggle></ToolTip>

        <ToolTip title="Unlink"><Toggle onClick={handleRemoveLink} pressed={activeFormats.link}>
          <Link2Off className="h-4 w-4" />
        </Toggle></ToolTip>

        <ToolTip title="Component"><Toggle onClick={() => insertComponent('card')}>
          <Plus className="h-4 w-4" />
        </Toggle>
        </ToolTip>
        <ToolTip title="Monaco"><Toggle onClick={() => MonacoComponent('monaco')}>
          <Braces className="h-4 w-4" />
        </Toggle>
        </ToolTip>

        <Popover>
          <PopoverTrigger className="hover:bg-[#E7E7E7] h-9 px-2 min-w-9 flex justify-center items-center rounded-md"><ToolTip title="Heading"><Heading className="h-4 w-4" /></ToolTip></PopoverTrigger>
          <PopoverContent className="w-full bg-white">
            <div className="gap-3 flex">
              <Toggle onClick={() => currentEditor?.chain().focus().toggleHeading({ level: 1 }).run()}  ><Heading1 className="h-4 w-4" /></Toggle>
              <Toggle onClick={() => currentEditor?.chain().focus().toggleHeading({ level: 2 }).run()}  ><Heading2 className="h-4 w-4" /></Toggle>
              <Toggle onClick={() => currentEditor?.chain().focus().toggleHeading({ level: 3 }).run()}  ><Heading3 className="h-4 w-4" /></Toggle>
              <Toggle onClick={() => currentEditor?.chain().focus().toggleHeading({ level: 4 }).run()}  ><Heading4 className="h-4 w-4" /></Toggle>
              <Toggle onClick={() => currentEditor?.chain().focus().toggleHeading({ level: 5 }).run()}  ><Heading5 className="h-4 w-4" /></Toggle>
              <Toggle onClick={() => currentEditor?.chain().focus().toggleHeading({ level: 6 }).run()}  ><Heading6 className="h-4 w-4" /></Toggle>
            </div>
          </PopoverContent>
        </Popover>

        <Popover >
          <PopoverTrigger className="hover:bg-[#E7E7E7] h-9 px-2 min-w-9 flex justify-center items-center rounded-md"><ToolTip title="Highlight"><Highlighter className="h-4 w-4" /></ToolTip></PopoverTrigger>
          <PopoverContent className="w-full bg-white">
            <div className="space-y-3">
              <div className="gap-3 flex">
                {['#958DF1', '#F98181', '#FBBC88', '#FAF594', '#70CFF8', '#94FADB', '#B9F18D'].map(color => (
                  <Toggle
                    key={color}
                    className="p-0 min-w-[15px] h-[15px] rounded-none"
                    style={{ backgroundColor: color }}
                    onClick={() => handleHighlight(color)}
                    pressed={activeHighlightColor === color}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <label>Unset Highlight</label>
                <Toggle className="p-0" onClick={() => currentEditor?.chain().focus().unsetHighlight().run()}><PaintBucket className="h-4 w-4" /> </Toggle>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger className="hover:bg-[#E7E7E7] h-9 px-2 min-w-9 flex justify-center items-center rounded-md"><ToolTip title="Color"><Palette className="h-4 w-4" /></ToolTip></PopoverTrigger>
          <PopoverContent className="w-full bg-white">
            <div className="space-y-3">
              <div className="gap-3 flex">
                <Toggle className="p-0 bg-[#958DF1] min-w-[15px] h-[15px] rounded-none hover:bg-[#958DF1]" onClick={() => currentEditor?.chain().focus().setColor('#958DF1').run()} />

                <Toggle className="p-0 bg-[#F98181] min-w-[15px] h-[15px] rounded-none hover:bg-[#F98181]" onClick={() => currentEditor?.chain().focus().setColor('#F98181').run()} />

                <Toggle className="p-0 bg-[#FBBC88] min-w-[15px] h-[15px] rounded-none hover:bg-[#FBBC88]" onClick={() => currentEditor?.chain().focus().setColor('#FBBC88').run()} />

                <Toggle className="p-0 bg-[#FAF594] min-w-[15px] h-[15px] rounded-none hover:bg-[#FAF594]" onClick={() => currentEditor?.chain().focus().setColor('#FAF594').run()} />

                <Toggle className="p-0 bg-[#70CFF8] min-w-[15px] h-[15px] rounded-none hover:bg-[#70CFF8]" onClick={() => currentEditor?.chain().focus().setColor('#70CFF8').run()} />

                <Toggle className="p-0 bg-[#94FADB] min-w-[15px] h-[15px] rounded-none hover:bg-[#94FADB]" onClick={() => currentEditor?.chain().focus().setColor('#94FADB').run()} />

                <Toggle className="p-0 bg-[#B9F18D] min-w-[15px] h-[15px] rounded-none hover:bg-[#B9F18D]" onClick={() => currentEditor?.chain().focus().setColor('#B9F18D').run()} />
              </div>
              <div className="flex items-center gap-3">
                <label>Inset Color</label>
                <input
                  type="color"
                  onInput={event => currentEditor?.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
                  value={currentEditor?.getAttributes('textStyle').color}
                  data-testid="setColor"
                />
              </div>
              <div className="flex items-center gap-3">
                <label>Unset Color</label>
                <Toggle className="p-0" onClick={() => currentEditor?.chain().focus().unsetColor().run()}><PaintBucket className="h-4 w-4" /> </Toggle>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger className="hover:bg-[#E7E7E7] h-9 px-2 min-w-9 flex justify-center items-center rounded-md"><ToolTip title="Image"><Image className="h-4 w-4" /></ToolTip></PopoverTrigger>
          <PopoverContent className="bg-white relative p-2">
            <Tabs defaultValue="URL" >
              <TabsList className="w-full bg-[#EDF2FA] text-black">
                <TabsTrigger className="w-6/12 data-[state=active]:bg-[#D3E3FD]" value="URL">URL</TabsTrigger>
                <TabsTrigger className="w-6/12 data-[state=active]:bg-[#D3E3FD]" value="Upload">Upload</TabsTrigger>
              </TabsList>
              <TabsContent value="URL" className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className={inputClass}
                />
                <button onClick={addImage} className="border cursor-pointer text-md font-medium h-10   px-6 py-2 rounded-md leading-[0px] bg-[#0b57d0] text-white">
                  Add Image
                </button></TabsContent>
              <TabsContent value="Upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </TabsContent>
            </Tabs>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger className="hover:bg-[#E7E7E7] h-9 px-2 min-w-9 flex justify-center items-center rounded-md"><ToolTip title="Video"><Film className="h-4 w-4" /></ToolTip></PopoverTrigger>
          <PopoverContent className="bg-white relative p-2">
            <div className="space-y-2">
              <input
                type="text"
                placeholder="YouTube URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className={inputClass}
              />
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Width"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className={inputClass}
                />
                <input
                  type="number"
                  placeholder="Height"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
              <button onClick={insertYouTubeVideo} className="border cursor-pointer text-md font-medium h-10   px-6 py-2 rounded-md leading-[0px] bg-[#0b57d0] text-white">Add Video</button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};