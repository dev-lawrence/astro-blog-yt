import type { Rule } from "sanity";

const categories = [
  { title: "daily digest", value: "daily digest" },
  { title: "design tools", value: "design tools" },
  { title: "tutorials", value: "tutorials" },
];

export const posts = {
  name: "post",
  title: "Post",
  type: "document",

  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    },

    {
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: categories,
      },
      initialValue: "daily digest",
    },

    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },

    {
      name: "date",
      title: "Date",
      type: "datetime",
    },

    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    },

    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },

    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
