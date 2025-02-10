import { Model, DataTypes } from "sequelize";

import sequelize from "@config/database";

export class PostModel extends Model {}

PostModel.init(
  {
    // TODO: if we design for mutiple source other than webz.io
    // source_name: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     notEmpty: true,
    //   },
    // },
    
    // The unique identifier for the post (assumed to be provided by the API)
    uuid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thread: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    ord_in_thread: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    parentUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    published: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    highlightText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    highlightTitle: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    highlightThreadTitle: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    externalLinks: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    sentiment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    external_links: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    externalImages: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    entities: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    crawled: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "PostModel",
    tableName: "posts", // Change the table name as necessary
    timestamps: false, // Automatically adds createdAt and updatedAt
  }
);
