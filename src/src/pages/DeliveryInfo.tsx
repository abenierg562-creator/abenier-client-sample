import { ArrowLeft, Truck, Clock, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const deliveryDetails = [
  { icon: Truck, title: 'Free Delivery', description: 'Free delivery on all shoe orders across Addis Ababa.' },
  { icon: Clock, title: 'Delivery Time', description: 'Orders are typically delivered within 1–3 business days.' },
  { icon: MapPin, title: 'Delivery Area', description: 'We currently deliver within Addis Ababa. Contact us for other locations.' },
  { icon: Phone, title: 'Contact for Delivery', description: 'Call or text us at +251918170559 for delivery inquiries.' },
];

const DeliveryInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-40 flex items-center gap-3 h-14 px-4 bg-background/95 backdrop-blur-sm border-b border-border">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-secondary">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-display font-bold text-foreground">Delivery Information</h1>
      </div>

      <div className="mx-4 mt-4 space-y-3">
        {deliveryDetails.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-3 p-4 bg-card rounded-2xl border border-border/50">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0 mt-0.5">
              <Icon size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryInfo;
