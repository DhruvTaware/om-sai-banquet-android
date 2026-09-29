import type { ReactNode } from "react";
import type { PackageEntertainment, PackageServiceDetails } from "@/data/packages/types";
import AvailabilityBadge from "./AvailabilityBadge";

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    {children}
  </div>
);

const ServicesDetails = ({
  entertainment,
  services,
  otherFacilities,
}: {
  entertainment: PackageEntertainment;
  services: PackageServiceDetails;
  otherFacilities: string[];
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
    <div>
      <Row label="DJ">
        <AvailabilityBadge value={entertainment.dholTasha} />
      </Row>
      <Row label="Ghoda Bhraman">
        <AvailabilityBadge value={entertainment.ghoda} />
      </Row>
      <Row label="Kaka Service">
        <AvailabilityBadge value={entertainment.kakaService} />
      </Row>
      <Row label="Sound">
        <span className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{entertainment.sound.type}</span>
          <AvailabilityBadge value={entertainment.sound.included} />
        </span>
      </Row>
      <Row label="Lighting">
        <span className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{entertainment.lighting.type}</span>
          <AvailabilityBadge value={entertainment.lighting.included} />
        </span>
      </Row>
      <Row label="LED Screen / Wall">
        <AvailabilityBadge value={entertainment.ledScreenOrWall} />
      </Row>
      <Row label="Traditional Music">
        <AvailabilityBadge value={entertainment.traditionalMusic} />
      </Row>
    </div>
    <div>
      <Row label="Waiters">
        <span className="text-sm font-medium">{services.waiters}</span>
      </Row>
      <Row label="Water Bottles">
        <span className="text-sm font-medium">{services.waterBottles}</span>
      </Row>
      <Row label="Tables">
        <AvailabilityBadge value={services.tables} />
      </Row>
      <Row label="Chairs">
        <AvailabilityBadge value={services.chairs} />
      </Row>
      <Row label="Buffet Counters">
        <AvailabilityBadge value={services.buffetCounters} />
      </Row>
      <Row label="Stage Furniture">
        <AvailabilityBadge value={services.stageFurniture} />
      </Row>
      <Row label="Cleaning">
        <AvailabilityBadge value={services.cleaning} />
      </Row>
    </div>
    {otherFacilities.length > 0 && (
      <div className="sm:col-span-2 mt-4 pt-4 border-t border-border/50">
        <p className="text-sm text-muted-foreground mb-2">Other Facilities</p>
        <div className="flex flex-wrap gap-2">
          {otherFacilities.map((f) => (
            <span key={f} className="text-xs px-3 py-1 rounded-full bg-muted text-foreground/80">
              {f}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default ServicesDetails;
