import {
  RocketIcon,
  CheckCircledIcon,
  CheckboxIcon,
  ReaderIcon,
  CalendarIcon,
  BarChartIcon,
  HomeIcon,
  ClipboardIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircledIcon,
  ChatBubbleIcon,
  StopIcon,
  BookmarkIcon,
  LightningBoltIcon,
  CrossCircledIcon,
  PersonIcon,
  StarIcon,
  Share1Icon,
  DotsVerticalIcon,
  CubeIcon,
  EnvelopeClosedIcon,
  Pencil2Icon,
  VideoIcon,
  BellIcon,
  ValueIcon,
  IdCardIcon,
  GearIcon,
  StackIcon,
  CodeIcon,
  MobileIcon,
  LockClosedIcon,
  ReloadIcon,
  EyeOpenIcon,
  TargetIcon,
  GridIcon,
  LayersIcon,
  ListBulletIcon,
} from '@radix-ui/react-icons'

const ICON_MAP = {
  RocketIcon,
  CheckCircledIcon,
  CheckboxIcon,
  ReaderIcon,
  CalendarIcon,
  BarChartIcon,
  HomeIcon,
  ClipboardIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircledIcon,
  ChatBubbleIcon,
  StopIcon,
  BookmarkIcon,
  LightningBoltIcon,
  CrossCircledIcon,
  PersonIcon,
  StarIcon,
  Share1Icon,
  DotsVerticalIcon,
  CubeIcon,
  EnvelopeClosedIcon,
  Pencil2Icon,
  VideoIcon,
  BellIcon,
  ValueIcon,
  IdCardIcon,
  GearIcon,
  StackIcon,
  CodeIcon,
  MobileIcon,
  LockClosedIcon,
  ReloadIcon,
  EyeOpenIcon,
  TargetIcon,
  GridIcon,
  LayersIcon,
  ListBulletIcon,
}

export default function Icon({ name, className = '', size = 16 }) {
  const Comp = ICON_MAP[name]
  if (!Comp) {
    return (
      <span
        className="inline-block rounded bg-slate-200"
        style={{ width: size, height: size }}
      />
    )
  }
  return <Comp className={className} width={size} height={size} />
}
