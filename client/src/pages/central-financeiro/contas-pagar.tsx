import React from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter } from "lucide-react";

export function ContasPagar() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Contas a Pagar</h1>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Conta
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Buscar contas..."
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
                <TableHead>Fornecedor</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Fornecedor A</TableCell>
                <TableCell>Material de Escritório</TableCell>
                <TableCell>15/04/2024</TableCell>
                <TableCell>R$ 1.500,00</TableCell>
                <TableCell>
                  <Badge variant="warning">Pendente</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    Detalhes
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fornecedor B</TableCell>
                <TableCell>Serviços de TI</TableCell>
                <TableCell>20/04/2024</TableCell>
                <TableCell>R$ 3.200,00</TableCell>
                <TableCell>
                  <Badge variant="success">Pago</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    Detalhes
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fornecedor C</TableCell>
                <TableCell>Aluguel</TableCell>
                <TableCell>05/04/2024</TableCell>
                <TableCell>R$ 4.500,00</TableCell>
                <TableCell>
                  <Badge variant="danger">Atrasado</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    Detalhes
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

export default ContasPagar; 