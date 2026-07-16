export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      Account: {
        Row: {
          accessToken: string | null;
          accessTokenExpiresAt: string | null;
          accountId: string;
          createdAt: string;
          id: string;
          idToken: string | null;
          password: string | null;
          providerId: string;
          refreshToken: string | null;
          refreshTokenExpiresAt: string | null;
          scope: string | null;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          accessToken?: string | null;
          accessTokenExpiresAt?: string | null;
          accountId: string;
          createdAt?: string;
          id: string;
          idToken?: string | null;
          password?: string | null;
          providerId: string;
          refreshToken?: string | null;
          refreshTokenExpiresAt?: string | null;
          scope?: string | null;
          updatedAt: string;
          userId: string;
        };
        Update: {
          accessToken?: string | null;
          accessTokenExpiresAt?: string | null;
          accountId?: string;
          createdAt?: string;
          id?: string;
          idToken?: string | null;
          password?: string | null;
          providerId?: string;
          refreshToken?: string | null;
          refreshTokenExpiresAt?: string | null;
          scope?: string | null;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Account_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
      DriveFile: {
        Row: {
          _id: string;
          description: string | null;
          fileName: string;
          fileUrl: string | null;
          mimeType: string;
          name: string;
          userId: string | null;
        };
        Insert: {
          _id: string;
          description?: string | null;
          fileName: string;
          fileUrl?: string | null;
          mimeType: string;
          name: string;
          userId?: string | null;
        };
        Update: {
          _id?: string;
          description?: string | null;
          fileName?: string;
          fileUrl?: string | null;
          mimeType?: string;
          name?: string;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "DriveFile_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
      Project: {
        Row: {
          _id: string;
          category: string;
          description: string | null;
          images: string[] | null;
          link: string | null;
          name: string;
          thumbnail: string | null;
          updatedAt: string;
          youtube: string | null;
        };
        Insert: {
          _id: string;
          category: string;
          description?: string | null;
          images?: string[] | null;
          link?: string | null;
          name: string;
          thumbnail?: string | null;
          updatedAt?: string;
          youtube?: string | null;
        };
        Update: {
          _id?: string;
          category?: string;
          description?: string | null;
          images?: string[] | null;
          link?: string | null;
          name?: string;
          thumbnail?: string | null;
          updatedAt?: string;
          youtube?: string | null;
        };
        Relationships: [];
      };
      Session: {
        Row: {
          createdAt: string;
          expiresAt: string;
          id: string;
          impersonatedBy: string | null;
          ipAddress: string | null;
          token: string;
          updatedAt: string;
          userAgent: string | null;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          expiresAt: string;
          id: string;
          impersonatedBy?: string | null;
          ipAddress?: string | null;
          token: string;
          updatedAt: string;
          userAgent?: string | null;
          userId: string;
        };
        Update: {
          createdAt?: string;
          expiresAt?: string;
          id?: string;
          impersonatedBy?: string | null;
          ipAddress?: string | null;
          token?: string;
          updatedAt?: string;
          userAgent?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Session_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
      User: {
        Row: {
          banExpires: string | null;
          banned: boolean | null;
          banReason: string | null;
          createdAt: string;
          email: string;
          emailVerified: boolean;
          id: string;
          image: string | null;
          name: string;
          role: string | null;
          updatedAt: string;
        };
        Insert: {
          banExpires?: string | null;
          banned?: boolean | null;
          banReason?: string | null;
          createdAt?: string;
          email: string;
          emailVerified?: boolean;
          id: string;
          image?: string | null;
          name: string;
          role?: string | null;
          updatedAt?: string;
        };
        Update: {
          banExpires?: string | null;
          banned?: boolean | null;
          banReason?: string | null;
          createdAt?: string;
          email?: string;
          emailVerified?: boolean;
          id?: string;
          image?: string | null;
          name?: string;
          role?: string | null;
          updatedAt?: string;
        };
        Relationships: [];
      };
      Verification: {
        Row: {
          createdAt: string;
          expiresAt: string;
          id: string;
          identifier: string;
          updatedAt: string;
          value: string;
        };
        Insert: {
          createdAt?: string;
          expiresAt: string;
          id: string;
          identifier: string;
          updatedAt?: string;
          value: string;
        };
        Update: {
          createdAt?: string;
          expiresAt?: string;
          id?: string;
          identifier?: string;
          updatedAt?: string;
          value?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
