import { BsTwitterX, BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { SiVercel } from "react-icons/si";
import Image from "next/image";
import { cn } from "@/lib";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-neutral-100 flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <header className="space-y-6">
          <div className="flex items-center gap-4">
            <img
              src="https://github.com/samdenty.png"
              alt="Profile"
              width={60}
              height={60}
              className="rounded-full border border-neutral-800"
            />
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                Sam Denty
              </h1>
              <p className="text-sm text-neutral-400">@samdenty</p>
            </div>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-neutral-300">
            {(() => {
              const birthDate = new Date(2002, 10, 21);
              const today = new Date();
              let age = today.getFullYear() - birthDate.getFullYear();
              const m = today.getMonth() - birthDate.getMonth();
              if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
              }

              return (
                <>
                  Hi I&apos;m Sam, a {age} year old developer living in Ireland.
                </>
              );
            })()}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <IconButton href="https://x.com/samddenty" className="text-white">
                <BsTwitterX className="size-4" />
              </IconButton>
              <IconButton href="https://github.com/samdenty">
                <BsGithub className="size-4" />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/in/samdenty/"
                className="text-blue-400"
              >
                <BsLinkedin className="size-4" />
              </IconButton>
              <IconButton
                href="https://www.instagram.com/sam.denty"
                className="text-pink-400"
              >
                <BsInstagram className="size-4" />
              </IconButton>
              <IconButton
                href="mailto:samddenty@gmail.com"
                className="text-orange-400"
              >
                <MdOutlineEmail className="size-4" />
              </IconButton>
            </div>
          </div>
        </header>

        <section className="mt-10 space-y-3">
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
            Experience
          </h2>

          <div className="space-y-2 text-sm">
            <ExperienceRow
              className="bg-neutral-500/25"
              icon={<SiVercel className="size-4" />}
              company="Vercel"
              role="AI Software Engineer"
              period="Mar 2025 – May 2025"
            >
              <li>Worked on the AI SDK v5 release</li>
            </ExperienceRow>
            <ExperienceRow
              className="bg-blue-400/25"
              icon={
                <Image src="/bolt.svg" alt="bolt.new" width={32} height={32} />
              }
              company="bolt.new"
              role="Senior Software Engineer"
              period="Jul 2022 – Feb 2025"
            >
              <li>
                Helped ARR grow from 600K to 40mil+ in 5 months, after years of
                work & investment on WebContainers
              </li>
            </ExperienceRow>

            <ExperienceRow
              className="bg-pink-400/25"
              icon={<Image src="/gqty.ico" alt="GQty" width={24} height={24} />}
              company="gqty (gqless)"
              role="Founder"
              period="Jan 2019 – Aug 2022"
            >
              <li>
                An experimental approach for GraphQL data fetching in React
                applications.
              </li>
            </ExperienceRow>

            <ExperienceRow
              className="bg-blue-400/25"
              icon={
                <Image
                  src="/stackblitz.svg"
                  alt="StackBlitz"
                  width={32}
                  height={32}
                />
              }
              company="StackBlitz"
              role="Founding Engineer"
              period="Jun 2018 – Nov 2020"
            >
              <li>
                Built a Node.JS runtime that works entirely in the browser.
              </li>
              <li>
                Implemented a patented first-of-its-kind in-browser TCP server
                built ontop service workers.
              </li>
            </ExperienceRow>

            <ExperienceRow
              className="bg-purple-400/25"
              icon={
                <Image
                  src="/widgetbot.svg"
                  alt="WidgetBot"
                  width={32}
                  height={32}
                />
              }
              company="WidgetBot.io"
              role="Founder"
              period="Aug 2016 – Feb 2019"
            >
              <li>
                A site for pixel-perfect Discord chat integration for websites
              </li>
            </ExperienceRow>
          </div>
        </section>
      </div>
    </main>
  );
}

function IconButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "size-10 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors border border-neutral-700",
        className,
      )}
    >
      {children}
    </a>
  );
}

type ExperienceRowProps = {
  className?: string;
  icon: React.ReactNode;
  company: string;
  role: string;
  period: string;
  children?: React.ReactNode;
};

function ExperienceRow({
  className,
  icon,
  company,
  role,
  period,
  children,
}: ExperienceRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg bg-neutral-700 px-3 py-3 border border-neutral-800",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div className="self-baseline size-8 rounded-lg bg-neutral-900 flex items-center justify-center text-xs">
          {icon}
        </div>
        <div className="flex flex-col gap-1.5">
          <div>
            <p className="text-sm font-medium text-neutral-100">{company}</p>
            <p className="text-xs text-neutral-100/35">
              {role}
              <span className="text-neutral-100/50"> | {period}</span>
            </p>
          </div>
          <ol className="list-disc ml-3 list-inside text-xs text-neutral-300">
            {children}
          </ol>
        </div>
      </div>
    </div>
  );
}

type ProjectRowProps = {
  name: string;
};

function ProjectRow({ name }: ProjectRowProps) {
  return (
    <button className="flex w-full items-center justify-between px-1.5 py-3 text-left hover:bg-neutral-950/60 transition-colors">
      <span className="text-neutral-100">{name}</span>
      <span className="text-xs text-neutral-500">{">"}</span>
    </button>
  );
}
