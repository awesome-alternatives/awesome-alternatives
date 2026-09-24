export interface Entry {
  etag: string;
  body: unknown;
}

function isEntry(value: unknown): value is Entry {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { etag?: unknown }).etag === "string" &&
    "body" in value
  );
}

export class Etags {
  private readonly entries: Map<string, Entry>;
  private readonly live = new Set<string>();

  private constructor(entries: Map<string, Entry>) {
    this.entries = entries;
  }

  static empty(): Etags {
    return new Etags(new Map());
  }

  static parse(text: string): Etags {
    let read: unknown;
    try {
      read = JSON.parse(text);
    } catch {
      return Etags.empty();
    }
    if (typeof read !== "object" || read === null) return Etags.empty();
    const entries = new Map<string, Entry>();
    for (const [key, value] of Object.entries(read)) {
      if (isEntry(value)) entries.set(key, value);
    }
    return new Etags(entries);
  }

  read(key: string): Entry | undefined {
    this.live.add(key);
    return this.entries.get(key);
  }

  write(key: string, entry: Entry): void {
    this.live.add(key);
    this.entries.set(key, entry);
  }

  forget(key: string): void {
    this.entries.delete(key);
  }

  toJSON(): Record<string, Entry> {
    const kept: Record<string, Entry> = {};
    for (const key of this.live) {
      const entry = this.entries.get(key);
      if (entry) kept[key] = entry;
    }
    return kept;
  }
}
