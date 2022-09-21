export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: rule => rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        maxLength: 96,
        source: "title"
      },
      validation: rule => rule.required()
    },
    {
      name: "createdAt",
      title: "Creation Date",
      type: "datetime",
      validation: rule => rule.required()
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: {
        type: "author"
      },
      validation: rule => rule.required()
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: {
        type: "category"
      },
      validation: rule => rule.required()
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: rule => rule.required()
    }
  ]
};