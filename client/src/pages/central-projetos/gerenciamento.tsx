import React from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreVertical } from "lucide-react";

export function GerenciamentoProjetos() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gerenciamento de Projetos</h1>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Projeto
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Buscar projetos..."
              className="w-full"
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Projeto</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Data de Início</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Redesign Website</TableCell>
                <TableCell>Empresa A</TableCell>
                <TableCell>João Silva</TableCell>
                <TableCell>01/04/2024</TableCell>
                <TableCell>30/04/2024</TableCell>
                <TableCell>
                  <Badge variant="warning">Em Andamento</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>App Mobile</TableCell>
                <TableCell>Empresa B</TableCell>
                <TableCell>Maria Santos</TableCell>
                <TableCell>15/03/2024</TableCell>
                <TableCell>15/05/2024</TableCell>
                <TableCell>
                  <Badge variant="success">No Prazo</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E-commerce</TableCell>
                <TableCell>Empresa C</TableCell>
                <TableCell>Pedro Oliveira</TableCell>
                <TableCell>01/03/2024</TableCell>
                <TableCell>01/05/2024</TableCell>
                <TableCell>
                  <Badge variant="danger">Atrasado</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}

export default GerenciamentoProjetos; 