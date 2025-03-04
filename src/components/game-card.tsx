"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GameCardProps {
  href: string;
  title: string;
  description: string;
}

export function GameCard({ href, title, description }: GameCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        className="h-full"
      >
        <Card className="h-full cursor-pointer transition-colors hover:border-primary/50">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
