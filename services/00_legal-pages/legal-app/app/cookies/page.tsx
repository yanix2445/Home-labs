import { Section } from '@/components/ui/section';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Politique de Cookies',
    description: 'Gestion et utilisation des cookies sur Black Rise',
};

export default function CookiesPage() {
    return (
        <div className="relative">
            <div
                className="absolute top-0 right-1/2 translate-x-1/2 w-[600px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, oklch(0.66 0.21 354), transparent 70%)' }}
                aria-hidden="true"
            />

            <Section className="pt-16">
                <PageHeader
                    title="Politique de Cookies"
                    description="Transparence complète sur les traceurs utilisés lors de votre navigation."
                />
            </Section>

            <Section variant="muted" className="pb-24">
                <div className="space-y-8 max-w-4xl mx-auto">
                    {/* Explication */}
                    <Card className="glass">
                        <CardHeader>
                            <CardTitle>Qu'est-ce qu'un cookie ?</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground space-y-4">
                            <p>
                                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette ou mobile) lors de la visite d'un site.
                                Il permet de conserver des données utilisateur afin de faciliter la navigation et de permettre certaines fonctionnalités.
                            </p>
                            <p>
                                Conformément à la directive ePrivacy et au RGPD, nous distinguons les cookies strictement nécessaires (exemptés de consentement)
                                des autres cookies (soumis à votre accord).
                            </p>
                        </CardContent>
                    </Card>

                    {/* Liste des Cookies */}
                    <Card className="glass overflow-hidden">
                        <CardHeader>
                            <CardTitle>Liste des Cookies Utilisés</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[150px]">Nom</TableHead>
                                        <TableHead>Finalité</TableHead>
                                        <TableHead className="w-[100px]">Durée</TableHead>
                                        <TableHead className="w-[120px]">Type</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">cookie-consent</TableCell>
                                        <TableCell>Mémorise vos préférences en matière de cookies (acceptation/refus).</TableCell>
                                        <TableCell>6 mois</TableCell>
                                        <TableCell><span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Nécessaire</span></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">session_id</TableCell>
                                        <TableCell>Maintient votre session active lors de la navigation.</TableCell>
                                        <TableCell>Session</TableCell>
                                        <TableCell><span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Nécessaire</span></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">_pk_id / _ga</TableCell>
                                        <TableCell>Identification unique pour les statistiques de visite (Analytics).</TableCell>
                                        <TableCell>13 mois</TableCell>
                                        <TableCell><span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">Analytique</span></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Gestion */}
                    <Card className="glass">
                        <CardHeader>
                            <CardTitle>Gérer vos préférences</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                Vous pouvez à tout moment modifier vos choix en cliquant sur l'icône de bouclier située en bas à gauche de chaque page.
                            </p>
                            <p>
                                Vous pouvez également configurer votre navigateur pour refuser systématiquement les cookies, bien que cela puisse altérer certaines fonctionnalités du site.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </Section>
        </div>
    );
}
