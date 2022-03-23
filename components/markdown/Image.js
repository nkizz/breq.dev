import Image from "next/image";

export default function MarkdownImage(props) {
  return (
    <div className="flex w-full justify-center">
      <Image {...props} src={"/" + props.src} className="text-center" />
    </div>
  );
}
