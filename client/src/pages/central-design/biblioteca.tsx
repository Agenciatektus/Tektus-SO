import React from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, Download, Image, FileText, Video } from "lucide-react";

export function Biblioteca() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Biblioteca de Design</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Item
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Image className="w-5 h-5 text-blue-500" />
                <CardTitle>Imagens</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">156 itens</Badge>
                  <span className="text-sm text-gray-500">Última atualização: 2h atrás</span>
                </div>
                <p className="text-sm text-gray-600">
                  Biblioteca de imagens, ícones e elementos visuais para uso em projetos.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>5 categorias</span>
                  <span>•</span>
                  <span>2.4GB</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-500" />
                <CardTitle>Documentos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">89 itens</Badge>
                  <span className="text-sm text-gray-500">Última atualização: 1d atrás</span>
                </div>
                <p className="text-sm text-gray-600">
                  Templates, guias de estilo e documentação de design.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>3 categorias</span>
                  <span>•</span>
                  <span>156MB</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-purple-500" />
                <CardTitle>Vídeos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">45 itens</Badge>
                  <span className="text-sm text-gray-500">Última atualização: 3d atrás</span>
                </div>
                <p className="text-sm text-gray-600">
                  Tutoriais, demonstrações e conteúdo audiovisual.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>2 categorias</span>
                  <span>•</span>
                  <span>4.8GB</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default Biblioteca; 