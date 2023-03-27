interface H1TemplateProps {
  text: number | string;
}

export default function H1Template({ text }: H1TemplateProps) {
  return <h1 className={`title lg:pb-6 md:pb-3 pb-4 px-4 md:text-3xl`}>{text}</h1>;
}
