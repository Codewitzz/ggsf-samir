import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Image as ImageIcon } from "lucide-react";

/**
 * Image management is done on the live site: Gallery page (when logged in) and “Edit Images” in the header.
 * This route remains for old bookmarks only.
 */
const AdminImages = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-lg px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Images
            </CardTitle>
            <CardDescription>
              Slot and gallery images are updated with <strong>live editing</strong> after you log in: use{" "}
              <strong>Edit Images</strong> in the header for on-page photos, and open the{" "}
              <strong>Gallery</strong> page for folder uploads and photo removal.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 sm:flex-row">
            <Button asChild variant="default">
              <Link to="/gallery">Open Gallery</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin/notices">
                <ExternalLink className="h-4 w-4 mr-2" />
                Admin: Notices
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin/gallery">Admin: Gallery sections</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AdminImages;
