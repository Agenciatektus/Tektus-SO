import React, { useState } from "react";
import ClientsTable from "@/components/dashboard/clients-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";

interface NewClientForm {
  name: string;
  email: string;
  healthScore: number;
}

export default function ClientControl() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewClientForm>();

  const onSubmit = async (data: NewClientForm) => {
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar cliente');
      }

      const client = await response.json();
      
      toast({
        title: "Cliente criado com sucesso!",
        description: `O cliente ${client.name} foi cadastrado.`,
      });
      
      setIsCreateDialogOpen(false);
      reset();
      
      // Recarregar a página para atualizar a lista de clientes
      window.location.reload();
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      toast({
        title: "Erro ao criar cliente",
        description: "Ocorreu um erro ao tentar criar o cliente. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Central de Clientes</h1>
          <p className="text-gray-500">Lista com status, health score, mensalidade e mais.</p>
        </div>
      </div>

      <ClientsTable onOpenCreateClient={() => setIsCreateDialogOpen(true)} />

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Cliente</DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para cadastrar um novo cliente.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Cliente</Label>
              <Input
                id="name"
                {...register("name", { required: "Nome é obrigatório" })}
                placeholder="Digite o nome do cliente"
              />
              {errors.name && (
                <span className="text-sm text-red-500">{errors.name.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "E-mail é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "E-mail inválido",
                  },
                })}
                placeholder="cliente@empresa.com"
              />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="healthScore">Health Score (0-10)</Label>
              <Input
                id="healthScore"
                type="number"
                min="0"
                max="10"
                step="0.1"
                {...register("healthScore", {
                  required: "Health Score é obrigatório",
                  min: {
                    value: 0,
                    message: "Health Score deve ser no mínimo 0",
                  },
                  max: {
                    value: 10,
                    message: "Health Score deve ser no máximo 10",
                  },
                })}
                placeholder="5.0"
              />
              {errors.healthScore && (
                <span className="text-sm text-red-500">
                  {errors.healthScore.message}
                </span>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Criar Cliente</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 