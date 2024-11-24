import { Driver } from '@/core/driver/entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ride')
export class Ride {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @Column({ name: 'customer_id', type: 'varchar', length: 255 })
  customerId?: string;

  @Column({ name: 'date', type: 'timestamp' })
  date: Date;

  @Column({ name: 'origin', type: 'varchar', length: 255 })
  origin: string;

  @Column({ name: 'destination', type: 'varchar', length: 255 })
  destination: string;

  @Column({ name: 'distance', type: 'decimal', precision: 10, scale: 2 })
  distance: number;

  @Column({ name: 'duration', type: 'varchar', length: 255 })
  duration: string;

  @Column({ name: 'value', type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @ManyToOne(() => Driver, (driver) => driver.id, { eager: true })
  driver?: Driver;

  constructor(
    customerId: string,
    date: Date,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    value: number,
    driver: Driver,
  ) {
    this.customerId = customerId;
    this.date = date;
    this.origin = origin;
    this.destination = destination;
    this.distance = distance;
    this.duration = duration;
    this.value = value;
    this.driver = driver;
  }
}
