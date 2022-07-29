import React from "react";

function LinksWidget({
  title = "Links Container",
  posts = [{ id: "sas", link: "#", name: "link to somewhere" }],
  numberOfPosts = 3,
  subText = "View all posts ",
}) {
  return (
    <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
      <div>
        <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
          {title}
        </h3>
        <ul role="list" className="mt-4 space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="text-base truncate">
              <a
                href={post.link}
                className="font-medium text-gray-900 hover:text-gray-700"
              >
                {post.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5 text-sm">
        <a
          href="#"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          {subText}
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
}

export default LinksWidget;
