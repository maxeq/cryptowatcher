interface H1TemplateProps {
  text: number | string;
}

export default function H1Template({ text }: H1TemplateProps) {
  return <h1 className={`title lg:pb-6 md:pb-3 px-4 md:text-3xl py-4 md:py-0`}>{text}</h1>;
}
