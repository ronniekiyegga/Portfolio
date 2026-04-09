import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="w-full text-sm font-medium rounded-tl-2xl rounded-tr-2xl">
      <div className="flex max-w-sm bg-gray-150 shadow-lg h-14 pb-0.5 bg-white dark:bg-gray-900/50 items-center justify-between overflow-hidden rounded-tl-2xl rounded-tr-2xl">
        {/* Contact — gradient label + subtle active background */}
        <Link
          href="mailto:kiyeggaronnie@gmail.com"
          className="flex items-center h-full rounded-tl-2xl px-12 py-3"
          style={{
            background:
              "var(--gradient-BGlight, linear-gradient(114deg, rgba(62, 123, 250, 0.02) 20.34%, rgba(102, 0, 204, 0.04) 36.8%, rgba(102, 0, 204, 0) 56.12%, rgba(62, 123, 250, 0.02) 76.52%))",
            boxShadow:
              "0 8px 8px -4px rgba(0, 0, 0, 0.04), 0 20px 24px -4px rgba(0, 0, 0, 0.08)",
          }}
        >
          <span className="text-xs font-semibold text-gradient-blue-static">
            Contact
          </span>
        </Link>

        <Link
          href="https://linkedin.com/in/ronniekiyegga"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-5 py-3 text-sm text-gray-400 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <span className="block text-xs">LinkedIn</span>
          <Linkedin className="hidden" size={20} />
        </Link>

        <div
          className="h-5 w-px shrink-0 bg-gray-200 dark:bg-gray-700"
          aria-hidden
        />

        <Link
          href="https://github.com/BlissfulCoda"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center rounded-tr-2xl px-5 mr-4 py-3 text-sm text-gray-400 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <span className="block text-xs">Github</span>
          <Github className="hidden" size={20} />
        </Link>
      </div>
    </div>
  );
};

export default ContactInfo;
