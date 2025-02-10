"use client"

import {type ColorResult, CirclePicker, SketchPicker} from "react-color";
import {
	LucideIcon,
	Undo2Icon,
	Redo2Icon,
	PrinterIcon,
	SpellCheckIcon,
	BoldIcon,
	ItalicIcon,
	UnderlineIcon, MessageSquarePlusIcon, ListTodoIcon, RemoveFormattingIcon, ChevronDownIcon, HighlighterIcon
} from "lucide-react";

import {cn} from "@/lib/utils";
import {useEditorStore} from "@/app/store/use-editor-store";
import {Separator} from "@/components/ui/separator";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Level} from "@tiptap/extension-heading";


const HighlightColorButton = () => {
	const {editor} = useEditorStore();
	const value = editor?.getAttributes("highlight").color || "#FFFFFFF";
	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setHighlight({color: color.hex}).run();
	}
	return (
		<DropdownMenu>
			
			<DropdownMenuTrigger asChild>
				<button
					className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
				>
					<HighlighterIcon className="size-4"/>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="p-0">
				<SketchPicker color={value} onChange={onChange}/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}


const TextColorButton = () => {
	const {editor} = useEditorStore();
	const value = editor?.getAttributes("textStyle").color || "#000000";
	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setColor(color.hex).run();
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
				>
					<span className="text-xs">A</span>
					<div className="h-0.5 w-full" style={{backgroundColor: value}}></div>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-0">
				<SketchPicker color={value} onChange={onChange}/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}


const HeadingLevelButton = () => {
	const {editor} = useEditorStore();
	const headings = [
		{label: "Normal Text", value: 0, fontSize: "16px"},
		{label: "Heading 1", value: 1, fontSize: "32px"},
		{label: "Heading 2", value: 2, fontSize: "24px"},
		{label: "Heading 3", value: 3, fontSize: "20px"},
		{label: "Heading 4", value: 4, fontSize: "18px"},
		{label: "Heading 5", value: 5, fontSize: "16px"},
	];


	const getCurrentHeading = () => {
		for (let level = 0; level <= 5; level++) {
			if (editor?.isActive("heading", {level})) {
				return `Heading ${level}`;
			}
		}

		return "Normal text";
	}


	return <DropdownMenu>
		<DropdownMenuTrigger asChild>
			<button
				className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
			>
				<span className="truncate">
					{getCurrentHeading()}
				</span>
				<ChevronDownIcon className="mi-2 size-4 shrink-0"/>
			</button>
		</DropdownMenuTrigger>

		<DropdownMenuContent className="p-1 flex flex-col gap-y-1">

			{headings.map(({label, value, fontSize}) => (
				<button
					key={value}
					onClick={() => {
						if (value === 0) {
							editor?.chain().focus().setParagraph().run();
						} else {
							editor?.chain().focus().toggleHeading({level: value as Level}).run();
						}
					}}
					style={{fontSize}}
					className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
						(value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", {level: value}) && "bg-neutral-200/80"
					)}
				>
					{label}
				</button>

			))}


		</DropdownMenuContent>
	</DropdownMenu>
}

const FontFamilyButton = () => {
	const {editor} = useEditorStore();
	const fonts = [
		{label: "Arial", value: "Arial",},
		{label: "Times New Roman", value: "Times New Roman",},
		{label: "Georgia", value: "Georgia",},
		{label: "Verdana", value: "Verdana",},
	];


	return <DropdownMenu>
		<DropdownMenuTrigger asChild>
			<button
				className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
			>
				<span className="truncate">
					{editor?.getAttributes("textStyle").fontFamily || "Arial"}
				</span>
				<ChevronDownIcon className="mi-2 size-4 shrink-0"/>
			</button>
		</DropdownMenuTrigger>
		<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
			{fonts.map(({label, value}) => (
				<button
					onClick={() => editor?.chain().focus().setFontFamily(value).run()}
					key={value}
					className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
						editor?.getAttributes("test-Style").fontFamily === value && "bg-neutral-200/80"
					)}
					style={{fontFamily: value}}
				>
					<span className="text-sm">{label}</span>
				</button>
			))}
		</DropdownMenuContent>
	</DropdownMenu>

}


interface ToolBarButtonProps {
	onclick?: () => void;
	isActive?: boolean;
	icon: LucideIcon
}

const ToolBarButton = ({
	                       onclick,
	                       isActive,
	                       icon: Icon,
                       }: ToolBarButtonProps) => {
	return (
		<button onClick={onclick}
		        className={cn(
			        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
			        isActive && "bg-neutral-200/80",
		        )}>
			<Icon className={"size-4"}/>
		</button>
	)
}
export default function Toolbar() {
	const {editor} = useEditorStore();
	const sections: {
		label: string;
		icon: LucideIcon;
		onClick: () => void;
		isActive?: boolean;
	}[][] = [
		[
			// 撤销
			{
				label: "Undo",
				icon: Undo2Icon,
				onClick: () => editor?.chain().focus().undo().run(),
			},
			// 取消撤销
			{
				label: "Redo",
				icon: Redo2Icon,
				onClick: () => editor?.chain().focus().redo().run(),
			},
			// 打印
			{
				label: "Print",
				icon: PrinterIcon,
				onClick: () => window.print(),
			},
			// 拼写检查
			{
				label: "Spell Check",
				icon: SpellCheckIcon,
				onClick: () => {
					const current = editor?.view.dom.getAttribute("spellcheck");
					editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
				},
			},
		],
		[
			// 加粗
			{
				label: "Bold",
				icon: BoldIcon,
				isActive: editor?.isActive("bold"),
				onClick: () => editor?.chain().focus().toggleBold().run(),
			},
			// 斜体
			{
				label: "Italic",
				icon: ItalicIcon,
				isActive: editor?.isActive("italic"),
				onClick: () => editor?.chain().focus().toggleItalic().run(),
			},
			// 下划线
			{
				label: "Underline",
				icon: UnderlineIcon,
				isActive: editor?.isActive("underline"),
				onClick: () => editor?.chain().focus().toggleUnderline().run(),
			},
		],
		[
			//评论
			{
				label: "Comment",
				icon: MessageSquarePlusIcon,
				onClick: () => console.log("TODO: Comment"),
				isActive: false
			},
			//待办事项列表
			{
				label: "List Todo",
				icon: ListTodoIcon,
				onClick: () => editor?.chain().focus().toggleTaskList().run(),
				isActive: editor?.isActive("taskList"),
			},
			//删除格式
			{
				label: "Remove Formatting",
				icon: RemoveFormattingIcon,
				onClick: () => editor?.chain().focus().unsetAllMarks().run(),
			},
		]
	];


	return (
		<div
			className={"bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto"}>
			{sections[0].map((item) => (

				<ToolBarButton
					key={item.label}
					onclick={item.onClick}
					icon={item.icon}
					isActive={item.isActive}/>
			))}
			<Separator orientation="vertical" className="h-6 bg-neutral-300"/>
			<FontFamilyButton/>
			<Separator orientation="vertical" className="h-6 bg-neutral-300"/>
			<HeadingLevelButton/>

			<Separator orientation="vertical" className="h-6 bg-neutral-300"/>
			{/*<span>todo：font size</span>*/}
			<Separator orientation="vertical" className="h-6 bg-neutral-300"/>
			{sections[1].map((item) => (
				<ToolBarButton
					key={item.label}
					onclick={item.onClick}
					icon={item.icon}
					isActive={item.isActive}/>
			))}

			<TextColorButton/>
			<HighlightColorButton/>

			{/*TODO:List*/}
			<Separator orientation="vertical" className="h-6 bg-neutral-300"/>
			{/*<span>todo：font size</span>*/}
			<Separator orientation="vertical" className="h-6 bg-neutral-300"/>
			{sections[2].map((item) => (
				<ToolBarButton
					key={item.label}
					onclick={item.onClick}
					icon={item.icon}
					isActive={item.isActive}/>
			))}
		</div>
	)
}
