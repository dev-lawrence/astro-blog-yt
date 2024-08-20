import type { Rule } from "sanity";

export const comment = {
  name: "comment",
  title: "Comment",
  type: "document",

  // name, email, content, post,  pending / approved,

  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
      readOnly: true,
    },

    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
      readOnly: true,
    },

    {
      name: "content",
      title: "Content",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }],
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: "isApproved",
      title: "Approved",
      type: "boolean",
      initialValue: false,
    },

    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    },
  ],
};
