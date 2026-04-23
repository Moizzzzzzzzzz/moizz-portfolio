import { Tag } from "@/components/ui/Tag";

export function StackList({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  );
}
