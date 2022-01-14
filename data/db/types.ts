/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/files": {
    get: {
      parameters: {
        query: {
          slug?: parameters["rowFilter.files.slug"];
          createdAt?: parameters["rowFilter.files.createdAt"];
          modifiedAt?: parameters["rowFilter.files.modifiedAt"];
          template?: parameters["rowFilter.files.template"];
          title?: parameters["rowFilter.files.title"];
          data?: parameters["rowFilter.files.data"];
          id?: parameters["rowFilter.files.id"];
          disabledFields?: parameters["rowFilter.files.disabledFields"];
          owner?: parameters["rowFilter.files.owner"];
          fileType?: parameters["rowFilter.files.fileType"];
          type?: parameters["rowFilter.files.type"];
          thumbnail_url?: parameters["rowFilter.files.thumbnail_url"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["files"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** files */
          files?: definitions["files"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          slug?: parameters["rowFilter.files.slug"];
          createdAt?: parameters["rowFilter.files.createdAt"];
          modifiedAt?: parameters["rowFilter.files.modifiedAt"];
          template?: parameters["rowFilter.files.template"];
          title?: parameters["rowFilter.files.title"];
          data?: parameters["rowFilter.files.data"];
          id?: parameters["rowFilter.files.id"];
          disabledFields?: parameters["rowFilter.files.disabledFields"];
          owner?: parameters["rowFilter.files.owner"];
          fileType?: parameters["rowFilter.files.fileType"];
          type?: parameters["rowFilter.files.type"];
          thumbnail_url?: parameters["rowFilter.files.thumbnail_url"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          slug?: parameters["rowFilter.files.slug"];
          createdAt?: parameters["rowFilter.files.createdAt"];
          modifiedAt?: parameters["rowFilter.files.modifiedAt"];
          template?: parameters["rowFilter.files.template"];
          title?: parameters["rowFilter.files.title"];
          data?: parameters["rowFilter.files.data"];
          id?: parameters["rowFilter.files.id"];
          disabledFields?: parameters["rowFilter.files.disabledFields"];
          owner?: parameters["rowFilter.files.owner"];
          fileType?: parameters["rowFilter.files.fileType"];
          type?: parameters["rowFilter.files.type"];
          thumbnail_url?: parameters["rowFilter.files.thumbnail_url"];
        };
        body: {
          /** files */
          files?: definitions["files"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles": {
    get: {
      parameters: {
        query: {
          user_id?: parameters["rowFilter.profiles.user_id"];
          id?: parameters["rowFilter.profiles.id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          user_id?: parameters["rowFilter.profiles.user_id"];
          id?: parameters["rowFilter.profiles.id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          user_id?: parameters["rowFilter.profiles.user_id"];
          id?: parameters["rowFilter.profiles.id"];
        };
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/templates": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.templates.id"];
          created_at?: parameters["rowFilter.templates.created_at"];
          owner_profile_id?: parameters["rowFilter.templates.owner_profile_id"];
          modified_at?: parameters["rowFilter.templates.modified_at"];
          deleted_at?: parameters["rowFilter.templates.deleted_at"];
          description?: parameters["rowFilter.templates.description"];
          title?: parameters["rowFilter.templates.title"];
          file_type?: parameters["rowFilter.templates.file_type"];
          default_theme_slug?: parameters["rowFilter.templates.default_theme_slug"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["templates"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** templates */
          templates?: definitions["templates"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.templates.id"];
          created_at?: parameters["rowFilter.templates.created_at"];
          owner_profile_id?: parameters["rowFilter.templates.owner_profile_id"];
          modified_at?: parameters["rowFilter.templates.modified_at"];
          deleted_at?: parameters["rowFilter.templates.deleted_at"];
          description?: parameters["rowFilter.templates.description"];
          title?: parameters["rowFilter.templates.title"];
          file_type?: parameters["rowFilter.templates.file_type"];
          default_theme_slug?: parameters["rowFilter.templates.default_theme_slug"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.templates.id"];
          created_at?: parameters["rowFilter.templates.created_at"];
          owner_profile_id?: parameters["rowFilter.templates.owner_profile_id"];
          modified_at?: parameters["rowFilter.templates.modified_at"];
          deleted_at?: parameters["rowFilter.templates.deleted_at"];
          description?: parameters["rowFilter.templates.description"];
          title?: parameters["rowFilter.templates.title"];
          file_type?: parameters["rowFilter.templates.file_type"];
          default_theme_slug?: parameters["rowFilter.templates.default_theme_slug"];
        };
        body: {
          /** templates */
          templates?: definitions["templates"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/themes": {
    get: {
      parameters: {
        query: {
          slug?: parameters["rowFilter.themes.slug"];
          created_at?: parameters["rowFilter.themes.created_at"];
          owner_template_id?: parameters["rowFilter.themes.owner_template_id"];
          deleted_at?: parameters["rowFilter.themes.deleted_at"];
          modified_at?: parameters["rowFilter.themes.modified_at"];
          title?: parameters["rowFilter.themes.title"];
          ui_schema?: parameters["rowFilter.themes.ui_schema"];
          size?: parameters["rowFilter.themes.size"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["themes"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** themes */
          themes?: definitions["themes"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          slug?: parameters["rowFilter.themes.slug"];
          created_at?: parameters["rowFilter.themes.created_at"];
          owner_template_id?: parameters["rowFilter.themes.owner_template_id"];
          deleted_at?: parameters["rowFilter.themes.deleted_at"];
          modified_at?: parameters["rowFilter.themes.modified_at"];
          title?: parameters["rowFilter.themes.title"];
          ui_schema?: parameters["rowFilter.themes.ui_schema"];
          size?: parameters["rowFilter.themes.size"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          slug?: parameters["rowFilter.themes.slug"];
          created_at?: parameters["rowFilter.themes.created_at"];
          owner_template_id?: parameters["rowFilter.themes.owner_template_id"];
          deleted_at?: parameters["rowFilter.themes.deleted_at"];
          modified_at?: parameters["rowFilter.themes.modified_at"];
          title?: parameters["rowFilter.themes.title"];
          ui_schema?: parameters["rowFilter.themes.ui_schema"];
          size?: parameters["rowFilter.themes.size"];
        };
        body: {
          /** themes */
          themes?: definitions["themes"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/rpc/get_templates": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: text */
            slug_input: string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/get_template_by_slug": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: text */
            slug_input: string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
}

export interface definitions {
  files: {
    /**
     * Format: character varying
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    slug: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    createdAt: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    modifiedAt: string;
    /** Format: jsonb */
    template: string;
    /** Format: character varying */
    title: string;
    /**
     * Format: jsonb
     * @default {}
     */
    data: string;
    /** Format: text */
    id: string;
    /** Format: jsonb */
    disabledFields?: string;
    /**
     * Format: character varying
     * @default anonymous
     */
    owner: string;
    /**
     * Format: text
     * @default png
     */
    fileType: string;
    /** Format: text */
    type?: string;
    /** Format: text */
    thumbnail_url?: string;
  };
  profiles: {
    /**
     * Format: uuid
     * @default extensions.uuid_generate_v4()
     */
    user_id?: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
  };
  templates: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    owner_profile_id?: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    modified_at: string;
    /** Format: timestamp with time zone */
    deleted_at?: string;
    /** Format: character varying */
    description?: string;
    /** Format: character varying */
    title: string;
    /**
     * Format: character varying
     * @default image
     */
    file_type: string;
    /** Format: character varying */
    default_theme_slug: string;
  };
  themes: {
    /**
     * Format: character varying
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    slug: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * This is a Foreign Key to `templates.id`.<fk table='templates' column='id'/>
     */
    owner_template_id: string;
    /** Format: timestamp with time zone */
    deleted_at?: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    modified_at?: string;
    /** Format: character varying */
    title?: string;
    /**
     * Format: jsonb
     * @default {}
     */
    ui_schema?: string;
    /** Format: ARRAY */
    size?: unknown[];
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description files */
  "body.files": definitions["files"];
  /** Format: character varying */
  "rowFilter.files.slug": string;
  /** Format: timestamp with time zone */
  "rowFilter.files.createdAt": string;
  /** Format: timestamp with time zone */
  "rowFilter.files.modifiedAt": string;
  /** Format: jsonb */
  "rowFilter.files.template": string;
  /** Format: character varying */
  "rowFilter.files.title": string;
  /** Format: jsonb */
  "rowFilter.files.data": string;
  /** Format: text */
  "rowFilter.files.id": string;
  /** Format: jsonb */
  "rowFilter.files.disabledFields": string;
  /** Format: character varying */
  "rowFilter.files.owner": string;
  /** Format: text */
  "rowFilter.files.fileType": string;
  /** Format: text */
  "rowFilter.files.type": string;
  /** Format: text */
  "rowFilter.files.thumbnail_url": string;
  /** @description profiles */
  "body.profiles": definitions["profiles"];
  /** Format: uuid */
  "rowFilter.profiles.user_id": string;
  /** Format: uuid */
  "rowFilter.profiles.id": string;
  /** @description templates */
  "body.templates": definitions["templates"];
  /** Format: uuid */
  "rowFilter.templates.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.templates.created_at": string;
  /** Format: uuid */
  "rowFilter.templates.owner_profile_id": string;
  /** Format: timestamp with time zone */
  "rowFilter.templates.modified_at": string;
  /** Format: timestamp with time zone */
  "rowFilter.templates.deleted_at": string;
  /** Format: character varying */
  "rowFilter.templates.description": string;
  /** Format: character varying */
  "rowFilter.templates.title": string;
  /** Format: character varying */
  "rowFilter.templates.file_type": string;
  /** Format: character varying */
  "rowFilter.templates.default_theme_slug": string;
  /** @description themes */
  "body.themes": definitions["themes"];
  /** Format: character varying */
  "rowFilter.themes.slug": string;
  /** Format: timestamp with time zone */
  "rowFilter.themes.created_at": string;
  /** Format: uuid */
  "rowFilter.themes.owner_template_id": string;
  /** Format: timestamp with time zone */
  "rowFilter.themes.deleted_at": string;
  /** Format: timestamp with time zone */
  "rowFilter.themes.modified_at": string;
  /** Format: character varying */
  "rowFilter.themes.title": string;
  /** Format: jsonb */
  "rowFilter.themes.ui_schema": string;
  /** Format: ARRAY */
  "rowFilter.themes.size": string;
}

export interface operations {}

export interface external {}
