const solutions = [
{
id: 1,
name: "Analytics",
description:
"Get a better understanding of where your traffic is coming from.",
href: "#",
icon: Icon,
},
{
id: 2,
name: "Engagement",
description: "Speak directly to your customers in a more meaningful way.",
href: "#",
icon: Icon,
},
{ id: 3,
name: "Security",
description: "Your customers' data will be safe and secure.",
href: "#",
icon: Icon,
},
{ id: 4,
name: "Integrations",
description: "Connect with third-party tools that you're already using.",
href: "#",
icon: Icon,
},
{ id: 5,
name: "Automations",
description:
"Build strategic funnels that will drive your customers to convert",
href: "#",
icon: Icon,
},
];

<div className="-mr-2 -my-2 md:hidden">
    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
        <span className="sr-only">Open menu</span>
        <Icon className="h-6 w-6" aria-hidden="true" />
    </Popover.Button>
</div> 

<Popover.Group as="nav" className="hidden md:flex space-x-10">
    <NavDropdown
      buttonText="Solutions"
      dropItems={solutions}
      resources={solutions}
      recentPosts={solutions}
    />
    <NavButton> Pricing</NavButton>
    <NavButton>Docs</NavButton>
    <NavDropdown buttonText="More" dropItems={solutions}>
      <LinksContainer />
    </NavDropdown>
</Popover.Group>

<Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
    <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div></div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {solutions.map((item) => (
                    <NavCard card={{ ...item, description: "hello" }} />
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <NavButton size="sm">Pricing</NavButton>
                <NavButton size="sm">Docs</NavButton>

                {resources.map((item) => (
                  <NavCard card={{ ...item, description: "helo" }} />
                ))}
              </div>
            <div>
                <NavButton variant="primary" className="w-full">
                  Sign up
                </NavButton>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer? <NavButton size="sm"> Sign in </NavButton>
                </p>
            </div>
            </div>
          </div>
   </Popover.Panel>
</Transition>
