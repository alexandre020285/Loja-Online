import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Configuração do Supabase
const supabaseUrl = "https://jlkxpkfidbwgooanvjyt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsa3hwa2ZpZGJ3Z29vYW52anl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4OTAwOTUsImV4cCI6MjA2NjQ2NjA5NX0.YRqsskPESA-Xy-tDtPeP9KdAFhxJqjncbuOWXLN2IXI";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Primeiro, deletar o endereço associado
    const { error: addressError } = await supabase
      .from('address')
      .delete()
      .eq('userId', id);

    if (addressError) {
      console.error("Erro ao deletar endereço:", addressError);
    }

    // Depois, deletar o usuário
    const { error: userError } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (userError) {
      console.error("Erro ao deletar usuário:", userError);
      return NextResponse.json(
        { error: "Erro ao deletar usuário" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao deletar usuário" },
      { status: 500 }
    );
  }
}
