import React from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, Filter } from "lucide-react";

export function Timeline() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Timeline de Projetos</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Período
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Março 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-24 text-sm text-gray-500">15/03</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Início do App Mobile</h3>
                      <Badge variant="success">No Prazo</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Equipe de Desenvolvimento</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 text-sm text-gray-500">01/03</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Início do E-commerce</h3>
                      <Badge variant="danger">Atrasado</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Equipe de Marketing</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Abril 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-24 text-sm text-gray-500">01/04</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Início do Redesign Website</h3>
                      <Badge variant="warning">Em Andamento</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Equipe de Design</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 text-sm text-gray-500">15/04</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Entrega da Fase 1 - App Mobile</h3>
                      <Badge variant="success">Concluído</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Equipe de Desenvolvimento</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maio 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-24 text-sm text-gray-500">01/05</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Entrega do E-commerce</h3>
                      <Badge variant="warning">Pendente</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Equipe de Marketing</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 text-sm text-gray-500">15/05</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Entrega do App Mobile</h3>
                      <Badge variant="warning">Pendente</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Equipe de Desenvolvimento</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 text-sm text-gray-500">30/05</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Entrega do Redesign Website</h3>
                      <Badge variant="warning">Pendente</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Equipe de Design</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default Timeline; 