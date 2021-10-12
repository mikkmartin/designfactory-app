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
  "/templates": {
    get: {
      parameters: {
        query: {
          slug?: parameters["rowFilter.templates.slug"];
          createdAt?: parameters["rowFilter.templates.createdAt"];
          modifiedAt?: parameters["rowFilter.templates.modifiedAt"];
          template?: parameters["rowFilter.templates.template"];
          title?: parameters["rowFilter.templates.title"];
          initialData?: parameters["rowFilter.templates.initialData"];
          templateID?: parameters["rowFilter.templates.templateID"];
          disabledFields?: parameters["rowFilter.templates.disabledFields"];
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
          slug?: parameters["rowFilter.templates.slug"];
          createdAt?: parameters["rowFilter.templates.createdAt"];
          modifiedAt?: parameters["rowFilter.templates.modifiedAt"];
          template?: parameters["rowFilter.templates.template"];
          title?: parameters["rowFilter.templates.title"];
          initialData?: parameters["rowFilter.templates.initialData"];
          templateID?: parameters["rowFilter.templates.templateID"];
          disabledFields?: parameters["rowFilter.templates.disabledFields"];
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
          slug?: parameters["rowFilter.templates.slug"];
          createdAt?: parameters["rowFilter.templates.createdAt"];
          modifiedAt?: parameters["rowFilter.templates.modifiedAt"];
          template?: parameters["rowFilter.templates.template"];
          title?: parameters["rowFilter.templates.title"];
          initialData?: parameters["rowFilter.templates.initialData"];
          templateID?: parameters["rowFilter.templates.templateID"];
          disabledFields?: parameters["rowFilter.templates.disabledFields"];
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
}

export interface definitions {
  templates: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    slug: string;
    createdAt: string;
    modifiedAt: string;
    template: string;
    title: string;
    initialData: string;
    templateID: string;
    disabledFields?: string;
  };
}

export interface parameters {
  /** Preference */
  preferParams: "params=single-object";
  /** Preference */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /** Preference */
  preferCount: "count=none";
  /** Filtering Columns */
  select: string;
  /** On Conflict */
  on_conflict: string;
  /** Ordering */
  order: string;
  /** Limiting and Pagination */
  range: string;
  /** Limiting and Pagination */
  rangeUnit: string;
  /** Limiting and Pagination */
  offset: string;
  /** Limiting and Pagination */
  limit: string;
  /** templates */
  "body.templates": definitions["templates"];
  "rowFilter.templates.slug": string;
  "rowFilter.templates.createdAt": string;
  "rowFilter.templates.modifiedAt": string;
  "rowFilter.templates.template": string;
  "rowFilter.templates.title": string;
  "rowFilter.templates.initialData": string;
  "rowFilter.templates.templateID": string;
  "rowFilter.templates.disabledFields": string;
}

export interface operations {}

export interface external {}
