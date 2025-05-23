import React from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreVertical } from "lucide-react";

export function Recursos() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Recursos</h1>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Recurso
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Buscar recursos..."
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
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Disponibilidade</TableHead>
                <TableHead>Projeto Atual</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Designer Senior</TableCell>
                <TableCell>Humano</TableCell>
                <TableCell>40h/semana</TableCell>
                <TableCell>Redesign Website</TableCell>
                <TableCell>
                  <Badge variant="success">Disponível</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Desenvolvedor Full Stack</TableCell>
                <TableCell>Humano</TableCell>
                <TableCell>30h/semana</TableCell>
                <TableCell>App Mobile</TableCell>
                <TableCell>
                  <Badge variant="warning">Parcial</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Licença Adobe Creative Cloud</TableCell>
                <TableCell>Software</TableCell>
                <TableCell>24/7</TableCell>
                <TableCell>E-commerce</TableCell>
                <TableCell>
                  <Badge variant="success">Disponível</Badge>
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

export default Recursos; 