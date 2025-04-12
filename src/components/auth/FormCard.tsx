import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  title: string;
  footer: { label: string; href: string };
  children: React.ReactNode;
};

export function FormCard({ title, footer, children }: Props) {
  return (
    <Card className="w-[500px] flex flex-col items-center border">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="w-[90%]">{children}</CardContent>
      <CardFooter>
        {/* react-router-dom의 Link 사용 */}
        <Link to={footer.href} className="text-sm text-sky-700">
          {footer.label}
        </Link>
      </CardFooter>
    </Card>
  );
}