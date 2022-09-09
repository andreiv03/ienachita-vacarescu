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
      name: "author",
      title: "Author",
      type: "reference",
      to: {
        type: "author"
      },
      validation: rule => rule.required()
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: {
            type: "category"
          }
        }
      ],
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