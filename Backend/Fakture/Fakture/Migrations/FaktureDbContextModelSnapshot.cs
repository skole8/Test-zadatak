﻿// <auto-generated />
using System;
using Fakture.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Fakture.Migrations
{
    [DbContext(typeof(FaktureDbContext))]
    partial class FaktureDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Fakture.Models.Artikal", b =>
                {
                    b.Property<Guid>("id_artikla")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<float>("PDV")
                        .HasColumnType("real");

                    b.Property<float>("cijena")
                        .HasColumnType("real");

                    b.Property<Guid>("id_fakture")
                        .HasColumnType("uniqueidentifier");

                    b.Property<float>("iznosBezPDV")
                        .HasColumnType("real");

                    b.Property<float>("iznostSaRabatomBezPDV")
                        .HasColumnType("real");

                    b.Property<int>("kolicina")
                        .HasColumnType("int");

                    b.Property<string>("naziv_artikla")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("postoRabata")
                        .HasColumnType("real");

                    b.Property<float>("rabat")
                        .HasColumnType("real");

                    b.Property<float>("ukupno")
                        .HasColumnType("real");

                    b.HasKey("id_artikla");

                    b.HasIndex("id_fakture");

                    b.ToTable("Artikal");
                });

            modelBuilder.Entity("Fakture.Models.Faktura", b =>
                {
                    b.Property<Guid>("id_fakture")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Datum")
                        .HasColumnType("datetime2");

                    b.Property<float>("PDV")
                        .HasColumnType("real");

                    b.Property<float>("iznosBezPDV")
                        .HasColumnType("real");

                    b.Property<float>("iznostSaRabatomBezPDV")
                        .HasColumnType("real");

                    b.Property<string>("partner")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("postoRabata")
                        .HasColumnType("real");

                    b.Property<float>("rabat")
                        .HasColumnType("real");

                    b.Property<float>("ukupno")
                        .HasColumnType("real");

                    b.HasKey("id_fakture");

                    b.ToTable("Fakture");
                });

            modelBuilder.Entity("Fakture.Models.User", b =>
                {
                    b.Property<string>("email")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("email");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Fakture.Models.Artikal", b =>
                {
                    b.HasOne("Fakture.Models.Faktura", "Faktura")
                        .WithMany()
                        .HasForeignKey("id_fakture")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Faktura");
                });
#pragma warning restore 612, 618
        }
    }
}
