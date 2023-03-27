interface H1TemplateProps {
  text: number | string;
  className?: string;
}

export default function H1Template({ text, className }: H1TemplateProps) {
  return <h1 className={`${className} title lg:pb-6 md:pb-3 pb-4 px-4 md:text-3xl`}>{text}</h1>;
}
