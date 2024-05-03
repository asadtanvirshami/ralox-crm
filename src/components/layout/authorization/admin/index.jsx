import { CheckCircleIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function StepsBullets({ items, steps }) {
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <nav className="flex justify-center" aria-label="Progress">
        <ol role="list" className="space-y-3">
          {items.map((step, stepIdx) => (
            <li
              key={step.name}
              className={classNames(
                stepIdx !== items.length - 1 ? "" : "",
                "relative"
              )}
            >
              {step.id < steps && step.status == "complete" ? (
                <>
                  {stepIdx !== items.length - 1 ? (
                    <div
                      className="absolute left-2.5 top-3 -ml-px mt-0.5 h-full w-0.5 bg-black"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a href={step.href} className="group">
                    <span className="flex items-start">
                      <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                        <CheckCircleIcon
                          className="h-full w-full text-black-600 group-hover:text-black-800"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        {step.name}
                      </span>
                    </span>
                  </a>
                </>
              ) : step.id === steps && step.status == "current" ? (
                <>
                  {stepIdx !== items.length - 1 ? (
                    <div
                      className="absolute left-2.5 top-3 -ml-px mt-1 h-full w-0.5 bg-gray-300"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href={step.href}
                    className="flex items-start"
                    aria-current="step"
                  >
                    <span
                      className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
                      aria-hidden="true"
                    >
                      <span className="absolute h-4 w-4 rounded-full bg-gray-300" />
                      <span className="relative block h-2 w-2 rounded-full  bg-teal-500" />
                    </span>
                    <span className="ml-3 text-sm font-medium text-teal-500">
                      {step.name}
                    </span>
                  </a>
                </>
              ) : (
                <>
                  {stepIdx !== items.length - 1 ? (
                    <div
                      className="absolute left-2.5 top-3 -ml-px mt-1 h-full w-0.5 bg-gray-300"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a href={step.href} className="group">
                    <span className="flex items-start">
                      <span
                        className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
                        aria-hidden="true"
                      >
                        <span className="absolute h-2 w-2 rounded-full bg-gray-300 group-hover:bg-gray-400" />
                      </span>
                      <span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        {step.name}
                      </span>
                    </span>
                  </a>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
