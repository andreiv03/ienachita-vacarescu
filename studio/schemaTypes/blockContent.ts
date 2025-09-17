import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      title: "Block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Title", value: "h2" },
        { title: "Subtitle", value: "h3" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "URL",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
