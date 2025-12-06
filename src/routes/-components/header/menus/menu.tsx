"use client";

import { Menu as MenuPrimitive } from "@base-ui-components/react/menu";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

const Menu = MenuPrimitive.Root;

const MenuPortal = MenuPrimitive.Portal;

function MenuTrigger(props: MenuPrimitive.Trigger.Props) {
	return (
		<MenuPrimitive.Trigger
			className={cn(
				"relative",
				"grid place-items-center",
				"before:opacity-0 before:inset-0 before:top-1/2 before:-translate-y-1/2 before:w-[40px] before:h-[24px] before:left-1/2 before:-translate-x-1/2",
				"before:content-[''] before:absolute before:bg-white/15",
				"before:rounded-full",
				// isClicked && "before:opacity-100",
			)}
			data-slot="menu-trigger"
			type="button"
			{...props}
		/>
	);
}

function MenuPopup({
	children,
	className,
	sideOffset = 4,
	align = "start",
	alignOffset = 0,
	side = "bottom",
	...props
}: MenuPrimitive.Popup.Props & {
	align?: MenuPrimitive.Positioner.Props["align"];
	sideOffset?: MenuPrimitive.Positioner.Props["sideOffset"];
	alignOffset?: MenuPrimitive.Positioner.Props["alignOffset"];
	side?: MenuPrimitive.Positioner.Props["side"];
}) {
	return (
		<MenuPrimitive.Portal>
			<MenuPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				className="z-50"
				data-slot="menu-positioner"
				side={side}
				sideOffset={sideOffset}
			>
				<MenuPrimitive.Popup
					className={cn(
						"relative flex",
						"min-w-[275px]!",
						"not-[class*='w-']:min-w-32",
						"origin-(--transform-origin)",
						"rounded-xl",
						"border",
						"bg-clip-padding",
						"shadow-lg",
						"transition-[scale,opacity]",
						"before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)]",
						"before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/8%)]",
						"has-data-starting-style:scale-98 has-data-starting-style:opacity-0",
						"bg-white/60 backdrop-blur-2xl dark:bg-clip-border",
						// Overrides
						"border-none bg-white/70 backdrop-blur-xs w-[305px] text-xs",
						className,
					)}
					data-slot="menu-popup"
					{...props}
				>
					<div className="max-h-(--available-height) w-full overflow-y-auto p-1">
						{children}
					</div>
				</MenuPrimitive.Popup>
			</MenuPrimitive.Positioner>
		</MenuPrimitive.Portal>
	);
}

function MenuGroup(props: MenuPrimitive.Group.Props) {
	return <MenuPrimitive.Group data-slot="menu-group" {...props} />;
}

function MenuItem({
	className,
	inset,
	variant = "default",
	...props
}: MenuPrimitive.Item.Props & {
	inset?: boolean;
	variant?: "default" | "destructive";
}) {
	return (
		<MenuPrimitive.Item
			className={cn(
				"flex items-center gap-2",
				"px-2 py-1",
				"text-xs",
				"cursor-default select-none",
				"rounded-sm outline-none",
				"data-disabled:pointer-events-none data-inset:ps-8",
				"data-[variant=destructive]:text-destructive-foreground",
				"data-highlighted:text-accent-foreground data-highlighted:bg-accent ",
				"data-disabled:opacity-64",
				"[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				// Overrides
				"rounded-lg py-[3px] data-highlighted:bg-black/5",
				className,
			)}
			data-inset={inset}
			data-slot="menu-item"
			data-variant={variant}
			{...props}
		/>
	);
}

function MenuCheckboxItem({
	className,
	children,
	checked,
	...props
}: MenuPrimitive.CheckboxItem.Props) {
	return (
		<MenuPrimitive.CheckboxItem
			checked={checked}
			className={cn(
				"grid in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-xs outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			data-slot="menu-checkbox-item"
			{...props}
		>
			<MenuPrimitive.CheckboxItemIndicator className="col-start-1">
				<CheckIcon />
			</MenuPrimitive.CheckboxItemIndicator>
			<span className="col-start-2">{children}</span>
		</MenuPrimitive.CheckboxItem>
	);
}

function MenuRadioGroup(props: MenuPrimitive.RadioGroup.Props) {
	return <MenuPrimitive.RadioGroup data-slot="menu-radio-group" {...props} />;
}

function MenuRadioItem({
	className,
	children,
	...props
}: MenuPrimitive.RadioItem.Props) {
	return (
		<MenuPrimitive.RadioItem
			className={cn(
				"grid in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-xs outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			data-slot="menu-radio-item"
			{...props}
		>
			<MenuPrimitive.RadioItemIndicator className="col-start-1">
				<CheckIcon />
			</MenuPrimitive.RadioItemIndicator>
			<span className="col-start-2">{children}</span>
		</MenuPrimitive.RadioItem>
	);
}

function MenuGroupLabel({
	className,
	inset,
	...props
}: MenuPrimitive.GroupLabel.Props & {
	inset?: boolean;
}) {
	return (
		<MenuPrimitive.GroupLabel
			className={cn(
				"px-2 py-1.5",
				"font-bold text-gray-600 text-xs tracking-tight",
				"data-inset:ps-9 sm:data-inset:ps-8",
				className,
			)}
			data-inset={inset}
			data-slot="menu-label"
			{...props}
		/>
	);
}

function MenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
	return (
		<MenuPrimitive.Separator
			className={cn("h-px bg-gray-400 m-0 opacity-40", className)}
			data-slot="menu-separator"
			{...props}
		/>
	);
}

function MenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			className={cn(
				"ms-auto text-muted-foreground/72 text-xs tracking-widest",
				className,
			)}
			data-slot="menu-shortcut"
			{...props}
		/>
	);
}

function MenuSub(props: MenuPrimitive.SubmenuRoot.Props) {
	return <MenuPrimitive.SubmenuRoot data-slot="menu-sub" {...props} />;
}

function MenuSubTrigger({
	className,
	inset,
	children,
	...props
}: MenuPrimitive.SubmenuTrigger.Props & {
	inset?: boolean;
}) {
	return (
		<MenuPrimitive.SubmenuTrigger
			className={cn(
				cn(
					"flex items-center gap-2",
					"rounded-sm px-2 py-1 text-xs outline-none",
					"data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64",
					"data-inset:ps-8",
					"[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
					className,
				),
			)}
			data-inset={inset}
			data-slot="menu-sub-trigger"
			{...props}
		>
			{children}
			<ChevronRightIcon className="ms-auto" />
		</MenuPrimitive.SubmenuTrigger>
	);
}

function MenuSubPopup({
	className,
	sideOffset = 0,
	alignOffset = -4,
	align = "start",
	...props
}: MenuPrimitive.Popup.Props & {
	align?: MenuPrimitive.Positioner.Props["align"];
	sideOffset?: MenuPrimitive.Positioner.Props["sideOffset"];
	alignOffset?: MenuPrimitive.Positioner.Props["alignOffset"];
}) {
	return (
		<MenuPopup
			align={align}
			alignOffset={alignOffset}
			className={className}
			data-slot="menu-sub-content"
			side="inline-end"
			sideOffset={sideOffset}
			{...props}
		/>
	);
}

export {
	Menu,
	Menu as DropdownMenu,
	MenuPortal,
	MenuPortal as DropdownMenuPortal,
	MenuTrigger,
	MenuTrigger as DropdownMenuTrigger,
	MenuPopup,
	MenuPopup as DropdownMenuContent,
	MenuGroup,
	MenuGroup as DropdownMenuGroup,
	MenuItem,
	MenuItem as DropdownMenuItem,
	MenuCheckboxItem,
	MenuCheckboxItem as DropdownMenuCheckboxItem,
	MenuRadioGroup,
	MenuRadioGroup as DropdownMenuRadioGroup,
	MenuRadioItem,
	MenuRadioItem as DropdownMenuRadioItem,
	MenuGroupLabel,
	MenuGroupLabel as DropdownMenuLabel,
	MenuSeparator,
	MenuSeparator as DropdownMenuSeparator,
	MenuShortcut,
	MenuShortcut as DropdownMenuShortcut,
	MenuSub,
	MenuSub as DropdownMenuSub,
	MenuSubTrigger,
	MenuSubTrigger as DropdownMenuSubTrigger,
	MenuSubPopup,
	MenuSubPopup as DropdownMenuSubContent,
};
