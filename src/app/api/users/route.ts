import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Configuração do Supabase
const supabaseUrl = "https://jlkxpkfidbwgooanvjyt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsa3hwa2ZpZGJ3Z29vYW52anl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4OTAwOTUsImV4cCI6MjA2NjQ2NjA5NX0.YRqsskPESA-Xy-tDtPeP9KdAFhxJqjncbuOWXLN2IXI";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    // Buscar usuários no Supabase
    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, email, createdAt');

    if (error) {
      console.error("Erro ao buscar usuários:", error);
      return NextResponse.json(
        { error: "Erro ao buscar usuários" },
        { status: 500 }
      );
    }

    return NextResponse.json(users || []);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}
