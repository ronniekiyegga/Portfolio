import Link from "next/link";
import { Github, Linkedin, Mails } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="w-full text-sm font-medium  dark:bg-gray-900/50 rounded-tl-2xl rounded-tr-2xl">
      <div className="flex max-w-sm bg-gray-150 shadow-lg h-14 pb-0.5 dark:bg-gray-900/50 items-center justify-between overflow-hidden rounded-tl-2xl rounded-tr-2xl">
        {/* Active: Github — left-rounded background + gradient text */}
        <Link
          href="https://github.com/BlissfulCoda"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center h-full rounded-tl-2xl px-12 py-3 "
          style={{
            background:
              "var(--gradient-BGlight, linear-gradient(114deg, rgba(62, 123, 250, 0.02) 20.34%, rgba(102, 0, 204, 0.04) 36.8%, rgba(102, 0, 204, 0) 56.12%, rgba(62, 123, 250, 0.02) 76.52%))",
            boxShadow:
              "0 8px 8px -4px rgba(0, 0, 0, 0.04), 0 20px 24px -4px rgba(0, 0, 0, 0.08)",
          }}
        >
          <span className="hidden sm:block text-gradient-blue">Github</span>
          <Github className="sm:hidden " size={20} />
        </Link>

        {/* Inactive: LinkedIn */}
        <Link
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-5 py-3 text-sm text-gray-400 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <span className="hidden sm:block">LinkedIn</span>
          <Linkedin className="sm:hidden" size={20} />
        </Link>

        {/* Divider */}
        <div
          className="h-5 w-px shrink-0 bg-gray-300 dark:bg-gray-700"
          aria-hidden
        />

        {/* Inactive: Email (underlined) */}
        <Link
          href="mailto:contact@ronniekiyegga.com"
          className="flex items-center px-5 mr-4 py-3 text-sm text-gray-400 decoration-gray-400 underline-offset-2 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <span className="hidden sm:block">Contact</span>
          <Mails className="sm:hidden" size={20} />
        </Link>
      </div>
    </div>
  );
};

export default ContactInfo;
