import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().error("Title is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        maxLength: 128,
        source: "title",
      },
      validation: (rule) => rule.required().error("Slug is required"),
    }),
    defineField({
      name: "createdAt",
      title: "Creation Date",
      type: "datetime",
      validation: (rule) => rule.required().error("Creation Date is required"),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required().error("Author is required"),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required().error("Category is required"),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (rule) => rule.required().error("Body is required"),
    }),
  ],
});
