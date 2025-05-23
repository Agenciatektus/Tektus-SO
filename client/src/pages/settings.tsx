import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function Settings() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar lógica de atualização de configurações
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
            <CardDescription>
              Gerencie suas preferências do sistema
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notificações</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Notificações por E-mail</Label>
                  <Switch id="email-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications">Notificações Push</Label>
                  <Switch id="push-notifications" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Privacidade</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="profile-visibility">Perfil Público</Label>
                  <Switch id="profile-visibility" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="activity-status">Mostrar Status de Atividade</Label>
                  <Switch id="activity-status" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preferências de Idioma</h3>
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma do Sistema</Label>
                  <select
                    id="language"
                    className="w-full p-2 border rounded-md"
                    defaultValue="pt-BR"
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">
                Salvar Configurações
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
}

export default Settings; 