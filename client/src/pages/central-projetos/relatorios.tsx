import React from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Calendar, BarChart, PieChart, LineChart } from "lucide-react";

export function Relatorios() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Relatórios</h1>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho de Projetos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
                <BarChart className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alocação de Recursos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
                <PieChart className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progresso ao Longo do Tempo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
                <LineChart className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Métricas Principais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Taxa de Entrega no Prazo</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Satisfação do Cliente</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Eficiência da Equipe</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Utilização de Recursos</span>
                  <span className="font-medium">82%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximos Prazos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Redesign Website</p>
                    <p className="text-sm text-gray-500">Equipe de Design</p>
                  </div>
                  <span className="text-sm text-gray-500">30/04/2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">App Mobile</p>
                    <p className="text-sm text-gray-500">Equipe de Desenvolvimento</p>
                  </div>
                  <span className="text-sm text-gray-500">15/05/2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">E-commerce</p>
                    <p className="text-sm text-gray-500">Equipe de Marketing</p>
                  </div>
                  <span className="text-sm text-gray-500">01/05/2024</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default Relatorios; 