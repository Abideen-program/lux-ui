// ── lux-ui ───────────────────────────────────────────────────
// Beautiful React component library powered by luxcss.

// Inputs
export { Button }   from './components/Button';
export type { ButtonProps } from './components/Button';

export { TextField } from './components/TextField';
export type { TextFieldProps, TextFieldState } from './components/TextField';

export { Textarea } from './components/Textarea';
export type { TextareaProps } from './components/Textarea';

export { Select } from './components/Select';
export type { SelectProps, SelectOption } from './components/Select';

export { Checkbox, RadioGroup } from './components/Checkbox';
export type { CheckboxProps, RadioGroupProps, RadioOption } from './components/Checkbox';

export { Switch } from './components/Switch';
export type { SwitchProps } from './components/Switch';

export { IconButton } from './components/IconButton';
export type { IconButtonProps } from './components/IconButton';

export { ButtonGroup } from './components/ButtonGroup';
export type { ButtonGroupProps } from './components/ButtonGroup';

export { Slider } from './components/Slider';
export type { SliderProps } from './components/Slider';

export { Rating } from './components/Rating';
export type { RatingProps } from './components/Rating';

export { ToggleButton, ToggleButtonGroup } from './components/ToggleButton';
export type { ToggleButtonProps, ToggleButtonGroupProps } from './components/ToggleButton';

export { Autocomplete } from './components/Autocomplete';
export type { AutocompleteProps, AutocompleteOption } from './components/Autocomplete';

// Data Display
export { Typography, H1, H2, H3, H4, Lead, Body, Caption, Label, Code, Overline } from './components/Typography';
export type { TypographyProps, TypographyVariant, TypographyGradient } from './components/Typography';

export { Avatar, AvatarGroup } from './components/Avatar';
export type { AvatarProps, AvatarGroupProps } from './components/Avatar';

export { Badge } from './components/Badge';
export type { BadgeProps } from './components/Badge';

export { Chip } from './components/Chip';
export type { ChipProps } from './components/Chip';

export { Divider } from './components/Divider';
export type { DividerProps } from './components/Divider';

export { Paper } from './components/Paper';
export type { PaperProps } from './components/Paper';

export { List, ListItem } from './components/List';
export type { ListProps, ListItemProps } from './components/List';

export { Table } from './components/Table';
export type { TableProps, TableColumn } from './components/Table';

export { ImageList } from './components/ImageList';
export type { ImageListProps, ImageListItemData } from './components/ImageList';

// Feedback
export { Alert } from './components/Alert';
export type { AlertProps } from './components/Alert';

export { Progress } from './components/Progress';
export type { ProgressProps } from './components/Progress';

export { Skeleton } from './components/Skeleton';
export type { SkeletonProps } from './components/Skeleton';

export { Spinner } from './components/Spinner';
export type { SpinnerProps } from './components/Spinner';

export { ToastProvider, useToast } from './components/Toast';
export type { ToastOptions } from './components/Toast';

export { Dialog } from './components/Dialog';
export type { DialogProps } from './components/Dialog';

// Surfaces
export { Card, CardHeader, CardBody, CardFooter, GlassCard, NeonCard, AuroraCard } from './components/Card';
export type { CardProps, CardHeaderProps, CardVariant } from './components/Card';

export { Accordion, AccordionItem } from './components/Accordion';
export type { AccordionProps, AccordionItemProps } from './components/Accordion';

export { AppBar } from './components/AppBar';
export type { AppBarProps } from './components/AppBar';

// Overlay
export { Modal } from './components/Modal';
export type { ModalProps } from './components/Modal';

export { Popover } from './components/Popover';
export type { PopoverProps, PopoverPlacement } from './components/Popover';

export { Backdrop } from './components/Backdrop';
export type { BackdropProps } from './components/Backdrop';

export { Tooltip } from './components/Tooltip';
export type { TooltipProps, TooltipPlacement } from './components/Tooltip';

export { Drawer } from './components/Drawer';
export type { DrawerProps } from './components/Drawer';

export { Portal } from './components/Portal';
export type { PortalProps } from './components/Portal';

// Layout
export { Box } from './components/Box';
export type { BoxProps } from './components/Box';

export { Container } from './components/Container';
export type { ContainerProps } from './components/Container';

export { Grid } from './components/Grid';
export type { GridProps } from './components/Grid';

export { Stack } from './components/Stack';
export type { StackProps } from './components/Stack';

export { Masonry } from './components/Masonry';
export type { MasonryProps } from './components/Masonry';

// Navigation
export { Tabs, TabList, Tab, TabPanel } from './components/Tabs';
export type { TabsProps, TabProps, TabPanelProps } from './components/Tabs';

export { Breadcrumbs } from './components/Breadcrumbs';
export type { BreadcrumbsProps, BreadcrumbItem } from './components/Breadcrumbs';

export { Pagination } from './components/Pagination';
export type { PaginationProps } from './components/Pagination';

export { Menu } from './components/Menu';
export type { MenuProps, MenuItemData } from './components/Menu';

export { Stepper } from './components/Stepper';
export type { StepperProps, StepData } from './components/Stepper';

export { Link } from './components/Link';
export type { LinkProps } from './components/Link';

export { BottomNavigation } from './components/BottomNavigation';
export type { BottomNavigationProps, BottomNavItem } from './components/BottomNavigation';

export { Menubar } from './components/Menubar';
export type { MenubarProps, MenubarMenu } from './components/Menubar';

export { SpeedDial } from './components/SpeedDial';
export type { SpeedDialProps, SpeedDialAction } from './components/SpeedDial';

// Shared types
export type {
  LuxTone, LuxSize, LuxRadius, LuxSurface, LuxVariant,
  BaseProps, ToneProps, SizeProps, RadiusProps, DisabledProps, LoadingProps,
} from './types';

// Lux Exclusive — visual personality components
export { GradientText } from './components/GradientText';
export type { GradientTextProps, GradientPreset } from './components/GradientText';

export { MagneticButton } from './components/MagneticButton';
export type { MagneticButtonProps } from './components/MagneticButton';

export { ConfettiButton } from './components/ConfettiButton';
export type { ConfettiButtonProps } from './components/ConfettiButton';

export { TiltCard } from './components/TiltCard';
export type { TiltCardProps } from './components/TiltCard';

export { Typewriter } from './components/Typewriter';
export type { TypewriterProps } from './components/Typewriter';

export { Counter } from './components/Counter';
export type { CounterProps } from './components/Counter';

export { Marquee } from './components/Marquee';
export type { MarqueeProps } from './components/Marquee';

export { CursorTrail } from './components/CursorTrail';
export type { CursorTrailProps } from './components/CursorTrail';

export { Timeline } from './components/Timeline';
export type { TimelineProps, TimelineItemData } from './components/Timeline';

export { ColorPicker } from './components/ColorPicker';
export type { ColorPickerProps } from './components/ColorPicker';

// Phase 2 — Data & Advanced UI
export { DatePicker } from './components/DatePicker';
export type { DatePickerProps } from './components/DatePicker';

export { TimePicker } from './components/TimePicker';
export type { TimePickerProps } from './components/TimePicker';

export { DataGrid } from './components/DataGrid';
export type { DataGridProps, DataGridColumn, SortDirection } from './components/DataGrid';

export { FileUpload } from './components/FileUpload';
export type { FileUploadProps } from './components/FileUpload';

export { TreeView } from './components/TreeView';
export type { TreeViewProps, TreeNode } from './components/TreeView';

export { VirtualList } from './components/VirtualList';
export type { VirtualListProps } from './components/VirtualList';

export { Kanban } from './components/Kanban';
export type { KanbanProps, KanbanCard, KanbanColumnData } from './components/Kanban';

export { BarChart, LineChart, AreaChart, PieChart, DonutChart } from './components/Charts';
export type { ChartDataPoint, BarChartProps, LineChartProps, PieChartProps } from './components/Charts';

export { CodeEditor } from './components/CodeEditor';
export type { CodeEditorProps } from './components/CodeEditor';

export { RichTextEditor } from './components/RichTextEditor';
export type { RichTextEditorProps } from './components/RichTextEditor';

export { InfiniteScroll } from './components/InfiniteScroll';
export type { InfiniteScrollProps } from './components/InfiniteScroll';
