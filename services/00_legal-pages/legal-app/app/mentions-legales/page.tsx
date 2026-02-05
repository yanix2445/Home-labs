import { Section } from '@/components/ui/section';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mentions Légales',
    description: 'Mentions légales obligatoires — Black Rise (Harrat Yanis)',
};

export default function MentionsLegalesPage() {
    return (
        <div className="relative">
            {/* Background */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, oklch(0.72 0.25 340), transparent 70%)' }}
                aria-hidden="true"
            />

            <Section className="pt-16">
                <PageHeader
                    title="Mentions Légales"
                    description="Informations légales obligatoires conformément à la loi pour la confiance dans l'économie numérique (LCEN)."
                />
            </Section>

            <Section variant="muted" className="pb-24">
                <div className="grid gap-6 max-w-4xl mx-auto">
                    {/* Éditeur */}
                    <Card className="glass">
                        <CardHeader>
                            <CardTitle>1. Éditeur du Site</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p>
                                Le présent site est édité par l'entreprise individuelle <strong>Black Rise</strong>,
                                immatriculée sous le nom de <strong>Yanis, Mohamed-Amine Harrat</strong>.
                            </p>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <h4 className="font-medium text-foreground mb-1">Siège Social</h4>
                                    <address className="not-italic">
                                        15 Allée des Demoiselles d'Avignon<br />
                                        92000 Nanterre<br />
                                        France
                                    </address>
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground mb-1">Identification</h4>
                                    <ul className="space-y-1">
                                        <li>SIREN : 919 266 668</li>
                                        <li>SIRET : 919 266 668 00020</li>
                                        <li>Code APE : 6201Z</li>
                                        <li>TVA Intracommunautaire : [Numéro TVA ou "Non assujetti"]</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Directeur de Publication */}
                    <Card className="glass">
                        <CardHeader>
                            <CardTitle>2. Directeur de la Publication</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            <p>
                                <strong>Yanis Harrat</strong><br />
                                Email de contact : <a href="mailto:yanis.amine.harrat@gmail.com" className="text-primary hover:underline">yanis.amine.harrat@gmail.com</a>
                            </p>
                        </CardContent>
                    </Card>

                    {/* Hébergeur */}
                    <Card className="glass">
                        <CardHeader>
                            <CardTitle>3. Hébergement</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            <p>
                                Le site est hébergé par :<br />
                                <strong className="text-foreground">[Nom de l'hébergeur - ex: Vercel Inc. / OVH SAS]</strong><br />
                                [Adresse de l'hébergeur]<br />
                                [Téléphone de l'hébergeur]
                            </p>
                            <p className="mt-4 text-sm bg-muted/50 p-3 rounded-lg border border-border/50">
                                Les données sont stockées exclusivement sur des serveurs situés dans l'Union Européenne.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Propriété Intellectuelle */}
                    <Card className="glass">
                        <CardHeader>
                            <CardTitle>4. Propriété Intellectuelle</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground space-y-2">
                            <p>
                                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
                                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                            </p>
                            <p>
                                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </Section>
        </div>
    );
}
