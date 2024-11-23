import { Ride } from '@/core/ride/entity';
import { Column, Entity, Check, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('driver')
@Check(`"review_rating" >= 0 AND "review_rating" <= 5`)
export class Driver {
  @PrimaryColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'vehicle', type: 'varchar', length: 255 })
  vehicle: string;

  @Column({ name: 'review_rating', type: 'int' })
  reviewRating: number;

  @Column({ name: 'review_comment', type: 'text' })
  reviewComment: string;

  @Column({ name: 'price_per_km', type: 'decimal', precision: 10, scale: 2 })
  pricePerKm: number;

  @Column({ name: 'minimum_required_km', type: 'int' })
  minimumRequiredKm: number;

  @OneToMany(() => Ride, (ride) => ride.id)
  ride?: Ride;

  constructor(
    id: number,
    name: string,
    description: string,
    vehicle: string,
    reviewRating: number,
    reviewComment: string,
    pricePerKm: number,
    minimumRequiredKm: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.vehicle = vehicle;
    this.reviewRating = reviewRating;
    this.reviewComment = reviewComment;
    this.pricePerKm = pricePerKm;
    this.minimumRequiredKm = minimumRequiredKm;
  }
}
