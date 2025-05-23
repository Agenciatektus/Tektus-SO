import React from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users, Calendar, Clock } from "lucide-react";

export function Equipes() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Equipes</h1>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Equipe
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Equipe de Design</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">5 membros</span>
              </div>
              <div className="flex -space-x-2 mb-4">
                <Avatar>
                  <AvatarImage src="/avatars/1.png" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="/avatars/2.png" />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="/avatars/3.png" />
                  <AvatarFallback>PO</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>+2</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>3 projetos ativos</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equipe de Desenvolvimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">7 membros</span>
              </div>
              <div className="flex -space-x-2 mb-4">
                <Avatar>
                  <AvatarImage src="/avatars/4.png" />
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="/avatars/5.png" />
                  <AvatarFallback>RS</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="/avatars/6.png" />
                  <AvatarFallback>TC</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>+4</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>5 projetos ativos</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equipe de Marketing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">4 membros</span>
              </div>
              <div className="flex -space-x-2 mb-4">
                <Avatar>
                  <AvatarImage src="/avatars/7.png" />
                  <AvatarFallback>LM</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="/avatars/8.png" />
                  <AvatarFallback>CP</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="/avatars/9.png" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>+1</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>2 projetos ativos</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default Equipes; 